// src/components/three/Scene.tsx - Brighter overall + fixed glass cards
'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import { TreeModel } from './TreeModel'
import * as THREE from 'three'

function PerformanceController({ shouldPause }: { shouldPause: boolean }) {
  const { invalidate } = useThree()
  
  useFrame(() => {
    if (shouldPause) return
    invalidate()
  })
  
  return null
}

// BRIGHTER base lighting + top spotlight for View 3
function DynamicLighting({ lightBoost = 1.0 }: { lightBoost?: number }) {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const directional1Ref = useRef<THREE.DirectionalLight>(null)
  const directional2Ref = useRef<THREE.DirectionalLight>(null)
  const pointRef = useRef<THREE.PointLight>(null)
  const topSpotRef = useRef<THREE.SpotLight>(null)
  
  // INCREASED: Base intensities now 30% brighter than before
  const baseAmbient = 0.3      // Was 0.2
  const baseDirectional1 = 0.7 // Was 0.5
  const baseDirectional2 = 0.4 // Was 0.3
  const basePoint = 0.3        // Was 0.2
  const baseTopSpot = 0.8
  
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.intensity = baseAmbient * lightBoost
    }
    if (directional1Ref.current) {
      directional1Ref.current.intensity = baseDirectional1 * lightBoost
    }
    if (directional2Ref.current) {
      directional2Ref.current.intensity = baseDirectional2 * lightBoost
    }
    if (pointRef.current) {
      pointRef.current.intensity = basePoint * lightBoost
    }
    // Top spotlight only for View 3
    if (topSpotRef.current) {
      topSpotRef.current.intensity = lightBoost > 1.5 ? baseTopSpot * lightBoost : 0
    }
  }, [lightBoost])
  
  return (
    <>
      <ambientLight ref={ambientRef} intensity={baseAmbient * lightBoost} />
      <directionalLight 
        ref={directional1Ref}
        position={[10, 10, 5]} 
        intensity={baseDirectional1 * lightBoost}
        castShadow 
      />
      <directionalLight 
        ref={directional2Ref}
        position={[-10, 5, -5]} 
        intensity={baseDirectional2 * lightBoost}
      />
      <pointLight 
        ref={pointRef}
        position={[0, 10, 0]} 
        intensity={basePoint * lightBoost} 
      />
      {/* Top spotlight for dark angles */}
      <spotLight
        ref={topSpotRef}
        position={[0, 250, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={0}
        castShadow
        target-position={[0, 0, 0]}
      />
    </>
  )
}

function CameraController({ 
  targetPosition,
  enableControls = true,
  isScrollMode = false,
  shouldPause = false
}: { 
  targetPosition: [number, number, number] | null
  enableControls?: boolean
  isScrollMode?: boolean
  shouldPause?: boolean
}) {
  const { camera } = useThree()
  const controlsRef = useRef<OrbitControlsType>(null)
  const animatingRef = useRef(false)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    setIsReady(true)
  }, [])
  
  const animateCamera = React.useCallback((targetPos: [number, number, number], duration = 1500) => {
    if (!controlsRef.current || animatingRef.current || shouldPause || !isReady) {
      return
    }
    
    animatingRef.current = true
    const startPosition = camera.position.clone()
    const endPosition = new THREE.Vector3(...targetPos)
    const startTime = Date.now()
    
    const startTarget = controlsRef.current.target.clone()
    const endTarget = new THREE.Vector3(0, 0, 0)
    
    const animate = () => {
      if (shouldPause) {
        animatingRef.current = false
        return
      }
      
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeInOut = progress * progress * (3 - 2 * progress)
      
      camera.position.lerpVectors(startPosition, endPosition, easeInOut)
      
      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(startTarget, endTarget, easeInOut)
        controlsRef.current.update()
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        animatingRef.current = false
      }
    }
    
    animate()
  }, [camera, shouldPause, isReady])

  useEffect(() => {
    if (targetPosition && isScrollMode && !shouldPause && isReady) {
      animateCamera(targetPosition, 1200)
    }
  }, [targetPosition, animateCamera, isScrollMode, shouldPause, isReady])

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={enableControls && !shouldPause}
      enableRotate={enableControls && !shouldPause}
      autoRotate={false}
      autoRotateSpeed={0.3}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI - Math.PI / 6}
      minDistance={50}
      maxDistance={300}
      target={[0, 0, 0]}
      enableDamping={true}
      dampingFactor={0.05}
      enabled={!shouldPause}
    />
  )
}

export default function Scene({ 
  targetPosition, 
  isScrollMode = false,
  shouldPause = false,
  lightBoost = 1.0 
}: { 
  targetPosition?: [number, number, number] | null
  isScrollMode?: boolean
  shouldPause?: boolean
  lightBoost?: number
}) {
  const [internalTargetPosition, setInternalTargetPosition] = useState<[number, number, number] | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    if (targetPosition && !shouldPause && mounted) {
      setInternalTargetPosition(targetPosition)
    }
  }, [targetPosition, shouldPause, mounted])
  
  if (shouldPause) {
    return (
      <div 
        className="w-full h-full" 
        style={{ 
          zIndex: -1,
          position: 'relative',
          background: 'transparent'
        }} 
      />
    )
  }
  
  if (!mounted) {
    return null
  }
  
  return (
    <div 
      className="w-full h-full"
      style={{ 
        zIndex: -1,
        position: 'relative'
      }}
    >
      <Canvas
        camera={{ 
          position: [80, 40, 80], 
          fov: 60 
        }}
        style={{ 
          background: 'transparent',
          zIndex: -1
        }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        frameloop={shouldPause ? 'never' : 'always'}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <PerformanceController shouldPause={shouldPause} />
        
        {/* Brighter dynamic lighting */}
        <DynamicLighting lightBoost={lightBoost} />
        
        <Environment preset="park" background={false} />
        
        <Suspense fallback={<TreeFallback />}>
          <TreeModel 
            isScrollMode={isScrollMode} 
            shouldPause={shouldPause}
          />
        </Suspense>
        
        <CameraController 
          targetPosition={internalTargetPosition}
          enableControls={!isScrollMode}
          isScrollMode={isScrollMode}
          shouldPause={shouldPause}
        />
      </Canvas>
    </div>
  )
}

function TreeFallback() {
  return (
    <group>
      <mesh position={[0, -35, 0]}>
        <cylinderGeometry args={[2, 3, 20, 8]} />
        <meshStandardMaterial color="#8B4513" wireframe />
      </mesh>
      <mesh position={[0, -20, 0]}>
        <sphereGeometry args={[15, 8, 6]} />
        <meshStandardMaterial color="#10b981" wireframe />
      </mesh>
      <mesh position={[0, 10, 0]}>
        <ringGeometry args={[8, 10, 8]} />
        <meshBasicMaterial color="#3B82F6" wireframe />
      </mesh>
    </group>
  )
}