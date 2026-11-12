'use client'

import React, { useRef, useState } from 'react'
import { motion, PanInfo } from 'framer-motion'
import { CUBE_CAPABILITIES, CubeFaceIndex } from '../../data/cubeCapabilities'
import { CubeFace } from './CubeFace'

interface CubeContainerProps {
  activeFace: CubeFaceIndex
  rotateX: number
  rotateY: number
  onSelectFace: (face: CubeFaceIndex) => void
  onSwipeHorizontal: (direction: 1 | -1) => void
  onSwipeVertical: (direction: 1 | -1) => void
  onDragRotate?: () => void
}

const SWIPE_THRESHOLD_PX = 30

export function CubeContainer({
  activeFace,
  rotateX,
  rotateY,
  onSelectFace,
  onSwipeHorizontal,
  onSwipeVertical,
  onDragRotate
}: CubeContainerProps) {
  const [isGrabbing, setIsGrabbing] = useState(false)
  const [showDragHint, setShowDragHint] = useState(true)
  const hasMovedRef = useRef(false)

  const handlePanStart = () => {
    setIsGrabbing(true)
    hasMovedRef.current = false
  }

  const handlePan = () => {
    hasMovedRef.current = true
  }

  const handlePanEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsGrabbing(false)
    const absX = Math.abs(info.offset.x)
    const absY = Math.abs(info.offset.y)

    if (absX < SWIPE_THRESHOLD_PX && absY < SWIPE_THRESHOLD_PX) {
      return
    }

    if (showDragHint) {
      setShowDragHint(false)
    }
    onDragRotate?.()

    if (absX >= absY) {
      onSwipeHorizontal(info.offset.x < 0 ? 1 : -1)
    } else {
      onSwipeVertical(info.offset.y < 0 ? 1 : -1)
    }
  }

  return (
    <div className="cube-perspective relative py-12 px-6 flex flex-col items-center justify-center touch-pan-y">
      {/* Cylindrical cybernetic base rings */}
      <div className="cube-cybernetic-base">
        <div className="cube-cybernetic-inner-ring" />
      </div>

      {/* Floating Drag Hint Pill */}
      {showDragHint && (
        <div
          aria-hidden="true"
          className="absolute top-2 z-20 px-2.5 py-0.5 rounded-full border border-[#5A9A78]/40 bg-[#141B24]/90 text-[10px] font-mono text-[#78C29A] backdrop-blur-md pointer-events-none transition-opacity duration-300 shadow-xs"
        >
          <span>Drag or click to rotate</span>
        </div>
      )}

      {/* Isometric 3D viewing angle wrapper with intuitive grab cursor */}
      <div
        className="cube-isometric-stage"
        style={{
          transform: 'rotateX(-22deg) rotateY(32deg)',
          transformOrigin: '50% 50%'
        }}
      >
        <motion.div
          className={`cube-scene ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`}
          initial={false}
          animate={{ rotateX, rotateY }}
          transition={{
            type: 'spring',
            stiffness: 110,
            damping: 20,
            mass: 0.95
          }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {/* Internal Wireframe Glowing Matrix (Visible through glass) */}
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded border border-[#5A9A78]/25 pointer-events-none"
            style={{
              transform: 'translateZ(0px)',
              boxShadow: '0 0 20px rgba(90,154,120,0.2)'
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded border border-[#5A9A78]/20 pointer-events-none"
            style={{ transform: 'rotateY(90deg) translateZ(0px)' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded border border-[#5A9A78]/20 pointer-events-none"
            style={{ transform: 'rotateX(90deg) translateZ(0px)' }}
          />

          {/* Glowing Central Power Core */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 w-8 h-8 -mt-4 -ml-4 rounded-full bg-[#5A9A78]/40 blur-xs pointer-events-none"
            style={{ transform: 'translateZ(0px)' }}
          />

          {/* Six Translucent Glass Faces arranged in true 3D space */}
          {CUBE_CAPABILITIES.map((capability) => (
            <CubeFace
              key={capability.id}
              capability={capability}
              isActive={capability.index === activeFace}
              onClickFace={() => onSelectFace(capability.index)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
