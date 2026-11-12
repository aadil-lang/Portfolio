import React, { useState, useRef, useEffect, useCallback } from 'react'
import { JOURNEY_NODES, JOURNEY_ZONES, JourneyNode } from '../../data/journeyMapData'
import { BackgroundCartography } from './BackgroundCartography'
import { VectorRoutes } from './VectorRoutes'
import { CheckpointNodes } from './CheckpointNodes'
import { ZoomIn, ZoomOut, RotateCcw, ArrowLeft, ArrowRight, Maximize2, MapPin } from 'lucide-react'

interface JourneyMapViewportProps {
  selectedNode: JourneyNode | null
  onSelectNode: (node: JourneyNode) => void
}

export const JourneyMapViewport: React.FC<JourneyMapViewportProps> = ({
  selectedNode,
  onSelectNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(0.55)
  const [pan, setPan] = useState({ x: 10, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [activeZoneId, setActiveZoneId] = useState<string>('all')
  const dragStartRef = useRef({ x: 0, y: 0 })

  // Canvas dimensions
  const canvasWidth = 2580
  const canvasHeight = 520

  // Calculate Fit-To-Container Zoom & Center
  const handleFitToView = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      const fitZoom = Math.min(0.85, Math.max(0.15, (containerWidth - 32) / canvasWidth))
      setZoom(fitZoom)
      setPan({ x: 16, y: 0 })
      setActiveZoneId('all')
    }
  }, [canvasWidth])

  // Zone focus handler
  const handleSelectZone = useCallback(
    (zoneId: string) => {
      setActiveZoneId(zoneId)
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth

      if (zoneId === 'all') {
        handleFitToView()
        return
      }

      const zone = JOURNEY_ZONES.find((z) => z.id === zoneId)
      if (zone) {
        const zoneWidth = zone.endX - zone.startX
        const zoneCenterX = (zone.startX + zone.endX) / 2
        const targetZoom = Math.min(0.9, Math.max(0.35, (containerWidth - 40) / zoneWidth))
        const targetX = -(zoneCenterX * targetZoom - containerWidth / 2)
        setZoom(targetZoom)
        setPan({ x: targetX, y: 0 })
      }
    },
    [handleFitToView]
  )

  // Fit to view on initial mount & window resize
  useEffect(() => {
    handleFitToView()
    window.addEventListener('resize', handleFitToView)
    return () => window.removeEventListener('resize', handleFitToView)
  }, [handleFitToView])

  // Center on node when user selects a node
  const centerOnNode = useCallback(
    (node: JourneyNode) => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const targetX = -(node.x * zoom - containerWidth / 2)
        setPan((prev) => ({
          ...prev,
          x: Math.min(60, Math.max(-(canvasWidth * zoom - containerWidth + 60), targetX))
        }))
      }
    },
    [zoom, canvasWidth]
  )

  useEffect(() => {
    if (selectedNode) {
      centerOnNode(selectedNode)
    }
  }, [selectedNode, centerOnNode])

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const targetTag = (e.target as HTMLElement).tagName.toLowerCase()
    if (targetTag === 'svg' || targetTag === 'rect' || targetTag === 'path' || targetTag === 'line') {
      setIsDragging(true)
      dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX - dragStartRef.current.x
    const newY = e.clientY - dragStartRef.current.y
    setPan({
      x: Math.min(100, Math.max(-1500, newX)),
      y: Math.min(60, Math.max(-80, newY))
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Wheel Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.05 : 0.05
      setZoom((prev) => Math.min(1.4, Math.max(0.4, prev + delta)))
    }
  }

  // Stepper controls
  const handlePrevNode = useCallback(() => {
    const currentIndex = selectedNode
      ? JOURNEY_NODES.findIndex((n) => n.id === selectedNode.id)
      : 0
    const prevIndex = Math.max(0, currentIndex - 1)
    onSelectNode(JOURNEY_NODES[prevIndex])
  }, [selectedNode, onSelectNode])

  const handleNextNode = useCallback(() => {
    const currentIndex = selectedNode
      ? JOURNEY_NODES.findIndex((n) => n.id === selectedNode.id)
      : -1
    const nextIndex = Math.min(JOURNEY_NODES.length - 1, currentIndex + 1)
    onSelectNode(JOURNEY_NODES[nextIndex])
  }, [selectedNode, onSelectNode])

  return (
    <div className="space-y-3">
      {/* Zone Navigator Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs no-scrollbar">
        <span className="text-[#686E77] text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#536B7A]" />
          <span>Jump to Zone:</span>
        </span>
        {JOURNEY_ZONES.map((zone) => {
          const isActive = activeZoneId === zone.id
          return (
            <button
              key={zone.id}
              onClick={() => handleSelectZone(zone.id)}
              className={`px-3 py-1 rounded-lg border shrink-0 transition-all ${
                isActive
                  ? 'bg-[#536B7A] border-[#71899A] text-[#F0EEE9] font-bold shadow-md'
                  : 'bg-[#14171A] border-[#2A2F36] text-[#9EA4AA] hover:text-[#F0EEE9] hover:border-[#3E4752]'
              }`}
            >
              {zone.label}
            </button>
          )
        })}
      </div>

      {/* Main Map Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[480px] sm:h-[520px] bg-[#14171A] border border-[#2A2F36] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing select-none shadow-2xl"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Viewport Zoom Controls Top-Right */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1.5 rounded-xl bg-[#14171A]/90 border border-[#2A2F36] backdrop-blur-md shadow-lg">
          <button
            onClick={handleFitToView}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A1D21] rounded-lg transition-colors"
            title="Fit Entire Map to View"
            aria-label="Fit Map to View"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#536B7A]" />
            <span className="hidden sm:inline">Fit View</span>
          </button>

          <div className="w-px h-4 bg-[#2A2F36]" />

          <button
            onClick={() => setZoom((prev) => Math.min(1.4, prev + 0.1))}
            className="p-1.5 text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A1D21] rounded-lg transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoom((prev) => Math.max(0.15, prev - 0.1))}
            className="p-1.5 text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A1D21] rounded-lg transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleFitToView}
            className="p-1.5 text-[#9EA4AA] hover:text-[#F0EEE9] hover:bg-[#1A1D21] rounded-lg transition-colors"
            title="Reset View"
            aria-label="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Navigation Bar Bottom-Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-[#14171A]/90 border border-[#2A2F36] backdrop-blur-md shadow-lg font-mono text-xs text-[#9EA4AA] max-w-[90%] sm:max-w-auto">
          <button
            onClick={handlePrevNode}
            className="flex items-center gap-1 hover:text-[#F0EEE9] transition-colors shrink-0"
            aria-label="Previous Station"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#536B7A]" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <span className="text-[#3E4752] shrink-0">|</span>

          <span className="text-[#F0EEE9] font-bold truncate max-w-[180px] sm:max-w-[280px]">
            {selectedNode ? `Station ${selectedNode.stationNumber}: ${selectedNode.title}` : 'Select Station'}
          </span>

          <span className="text-[#3E4752] shrink-0">|</span>

          <button
            onClick={handleNextNode}
            className="flex items-center gap-1 hover:text-[#F0EEE9] transition-colors shrink-0"
            aria-label="Next Station"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#536B7A]" />
          </button>
        </div>

        {/* SVG Canvas */}
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          width={canvasWidth}
          height={canvasHeight}
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute top-0 left-0"
        >
          {/* Background Cartography */}
          <BackgroundCartography width={canvasWidth} height={canvasHeight} />

          {/* Connecting Transit Lines */}
          <VectorRoutes />

          {/* Station Checkpoints */}
          <CheckpointNodes
            nodes={JOURNEY_NODES}
            selectedId={selectedNode?.id || null}
            onSelectNode={onSelectNode}
          />
        </svg>
      </div>
    </div>
  )
}
