'use client'

import { useEffect, useReducer, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { CUBE_CAPABILITIES, CubeFaceIndex } from '../../data/cubeCapabilities'

export interface CubeState {
  activeFace: CubeFaceIndex
  rotateX: number
  rotateY: number
  hasInteracted: boolean
  interactionCount: number
}

export type CubeAction =
  | { type: 'SELECT_FACE'; face: CubeFaceIndex }
  | { type: 'STEP_NEXT' }
  | { type: 'STEP_PREV' }
  | { type: 'STEP_HORIZONTAL'; direction: 1 | -1 }
  | { type: 'STEP_VERTICAL'; direction: 1 | -1 }
  | { type: 'RESET' }

export const INITIAL_CUBE_STATE: CubeState = {
  activeFace: 0,
  rotateX: CUBE_CAPABILITIES[0].targetRotation.rotateX,
  rotateY: CUBE_CAPABILITIES[0].targetRotation.rotateY,
  hasInteracted: false,
  interactionCount: 0
}

function toFaceState(
  prev: CubeState,
  nextFace: CubeFaceIndex
): CubeState {
  const capability = CUBE_CAPABILITIES[nextFace]
  return {
    activeFace: nextFace,
    rotateX: capability.targetRotation.rotateX,
    rotateY: capability.targetRotation.rotateY,
    hasInteracted: true,
    interactionCount: prev.interactionCount + 1
  }
}

/**
 * Pure deterministic reducer for discrete 90-degree cube face transitions.
 * Never locks or queues conflicting animations on rapid repeated input.
 */
export function cubeReducer(state: CubeState, action: CubeAction): CubeState {
  switch (action.type) {
    case 'SELECT_FACE': {
      return toFaceState(state, action.face)
    }
    case 'STEP_NEXT': {
      const next = ((state.activeFace + 1) % 6) as CubeFaceIndex
      return toFaceState(state, next)
    }
    case 'STEP_PREV': {
      const prev = ((state.activeFace + 5) % 6) as CubeFaceIndex
      return toFaceState(state, prev)
    }
    case 'STEP_HORIZONTAL': {
      if (state.activeFace <= 3) {
        const nextLateral = ((state.activeFace + action.direction + 4) % 4) as CubeFaceIndex
        return toFaceState(state, nextLateral)
      }
      // Recover cleanly from Top (4) or Bottom (5) to Right (1) or Left (3)
      const target: CubeFaceIndex = action.direction === 1 ? 1 : 3
      return toFaceState(state, target)
    }
    case 'STEP_VERTICAL': {
      if (action.direction === 1) {
        if (state.activeFace === 5) return toFaceState(state, 0)
        if (state.activeFace === 4) return toFaceState(state, 0)
        return toFaceState(state, 4)
      }
      if (state.activeFace === 4) return toFaceState(state, 0)
      if (state.activeFace === 5) return toFaceState(state, 0)
      return toFaceState(state, 5)
    }
    case 'RESET': {
      return toFaceState(state, 0)
    }
    default:
      return state
  }
}

export interface CubeEnvironment {
  hasMounted: boolean
  prefersReducedMotion: boolean
  isMobileViewport: boolean
  supports3D: boolean
  shouldUseFlatGrid: boolean
}

export function useCubeState() {
  const [state, dispatch] = useReducer(cubeReducer, INITIAL_CUBE_STATE)
  const framerReducedMotion = useReducedMotion()

  const [hasMounted, setHasMounted] = useState(false)
  const [mediaReducedMotion, setMediaReducedMotion] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(false)
  const [supports3D, setSupports3D] = useState(true)

  useEffect(() => {
    setHasMounted(true)

    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      setSupports3D(CSS.supports('transform-style', 'preserve-3d'))
    } else {
      setSupports3D(false)
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileQuery = window.matchMedia('(max-width: 639px)')

    setMediaReducedMotion(motionQuery.matches)
    setIsMobileViewport(mobileQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setMediaReducedMotion(e.matches)
    }
    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(e.matches)
    }

    motionQuery.addEventListener('change', handleMotionChange)
    mobileQuery.addEventListener('change', handleMobileChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      mobileQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  const prefersReducedMotion = Boolean(framerReducedMotion || mediaReducedMotion)
  const shouldUseFlatGrid = isMobileViewport || prefersReducedMotion || !supports3D

  return {
    state,
    dispatch,
    environment: {
      hasMounted,
      prefersReducedMotion,
      isMobileViewport,
      supports3D,
      shouldUseFlatGrid
    } satisfies CubeEnvironment
  }
}

