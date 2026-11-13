'use client'

import React, { useEffect, useState } from 'react'
import { CUBE_CAPABILITIES } from '../../data/cubeCapabilities'
import { CubeContainer } from './CubeContainer'
import { CubeInfoPanel } from './CubeInfoPanel'
import { CubeNavigation } from './CubeNavigation'
import { ReducedMotionGrid } from './ReducedMotionGrid'
import { useCubeState } from './useCubeState'

export default function EngineeringCube() {
  const { state, dispatch, environment } = useCubeState()
  const [isAutoRotateEnabled, setIsAutoRotateEnabled] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // 5-second automatic rotation cycling through all 6 faces in sequential order (0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 0)
  // Pauses on hover, keyboard focus, pointer drag, or when user pauses explicitly via toggle
  // WCAG 2.2.2 Pause, Stop, Hide compliant
  useEffect(() => {
    if (
      environment.shouldUseFlatGrid ||
      !isAutoRotateEnabled ||
      isHovered ||
      isFocused ||
      isDragging
    ) {
      return
    }

    const timer = setInterval(() => {
      dispatch({ type: 'STEP_NEXT' })
    }, 5000)

    return () => clearInterval(timer)
  }, [
    environment.shouldUseFlatGrid,
    isAutoRotateEnabled,
    isHovered,
    isFocused,
    isDragging,
    state.activeFace
  ])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        dispatch({ type: 'STEP_HORIZONTAL', direction: 1 })
        break
      case 'ArrowLeft':
        e.preventDefault()
        dispatch({ type: 'STEP_HORIZONTAL', direction: -1 })
        break
      case 'ArrowUp':
        e.preventDefault()
        dispatch({ type: 'STEP_VERTICAL', direction: 1 })
        break
      case 'ArrowDown':
        e.preventDefault()
        dispatch({ type: 'STEP_VERTICAL', direction: -1 })
        break
      case 'Home':
      case 'Escape':
        e.preventDefault()
        dispatch({ type: 'RESET' })
        break
    }
  }

  if (!environment.hasMounted) {
    return (
      <div
        aria-hidden="true"
        className="w-full max-w-[380px] h-[520px] mx-auto rounded-xl border border-[#2A2F36] bg-[#14171A]/60 animate-pulse"
      />
    )
  }

  if (environment.shouldUseFlatGrid) {
    const reason = environment.prefersReducedMotion
      ? 'Reduced Motion'
      : !environment.supports3D
      ? '2D Fallback'
      : undefined
    return (
      <section
        aria-label="Engineering capabilities navigator"
        className="w-full"
      >
        <ReducedMotionGrid reasonLabel={reason} />
      </section>
    )
  }

  const activeCapability = CUBE_CAPABILITIES[state.activeFace]
  const isAutoRotating =
    isAutoRotateEnabled && !isHovered && !isFocused && !isDragging

  return (
    <section
      aria-label="Interactive 3D engineering capabilities cube"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      tabIndex={0}
      className="w-full flex flex-col items-center space-y-4 focus-visible:outline-none"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#78C29A] font-semibold">
        Interactive 3D Capability Cube // 6 Domains
      </div>

      {/* Actual 3D Geometry Stage */}
      <CubeContainer
        activeFace={state.activeFace}
        rotateX={state.rotateX}
        rotateY={state.rotateY}
        onSelectFace={(face) => dispatch({ type: 'SELECT_FACE', face })}
        onSwipeHorizontal={(direction) =>
          dispatch({ type: 'STEP_HORIZONTAL', direction })
        }
        onSwipeVertical={(direction) =>
          dispatch({ type: 'STEP_VERTICAL', direction })
        }
        onPanStart={() => setIsDragging(true)}
        onPanEnd={() => setIsDragging(false)}
      />

      {/* Full Capability Details & Action Links Panel (External to cube) */}
      <CubeInfoPanel capability={activeCapability} />

      {/* Manual Stepper & 6-Face Selector Navigation */}
      <CubeNavigation
        activeFace={state.activeFace}
        onSelectFace={(face) => dispatch({ type: 'SELECT_FACE', face })}
        onPrev={() => dispatch({ type: 'STEP_PREV' })}
        onNext={() => dispatch({ type: 'STEP_NEXT' })}
        onReset={() => dispatch({ type: 'RESET' })}
        isAutoRotating={isAutoRotating}
        onToggleAutoRotate={() => setIsAutoRotateEnabled((prev) => !prev)}
      />
    </section>
  )
}
