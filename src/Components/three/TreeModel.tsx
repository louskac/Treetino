// src/components/three/TreeModel.tsx - Darkened with material adjustments
'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function TreeModel({ 
  isScrollMode = false, 
  shouldPause = false 
}: { 
  isScrollMode?: boolean
  shouldPause?: boolean 
}) {
  const meshRef = useRef<THREE.Group>(null)
  
  // Load your GLTF file
  const { scene } = useGLTF('https://966ybesamcxuuekz.public.blob.vercel-storage.com/tree-ultra-zuCz4vh0vJBxIEeMvIj4Tj5ZO4StVb.glb')
  
  // Darken the model materials on load
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // If the material exists, darken it
          if (child.material) {
            // Handle both single materials and material arrays
            const materials = Array.isArray(child.material) ? child.material : [child.material]
            
            materials.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial || 
                  material instanceof THREE.MeshPhysicalMaterial) {
                
                // Reduce emissive intensity (glow)
                material.emissiveIntensity = 0.1
                
                // Darken the base color by 40%
                if (material.color) {
                  material.color.multiplyScalar(0.6)
                }
                
                // Reduce metalness for less reflection
                if (material.metalness !== undefined) {
                  material.metalness *= 0.7
                }
                
                // Increase roughness for less shine
                if (material.roughness !== undefined) {
                  material.roughness = Math.min(1, material.roughness * 1.3)
                }
                
                material.needsUpdate = true
              }
            })
          }
        }
      })
    }
  }, [scene])
  
  // Rotation animation
  useFrame(() => {
    if (meshRef.current && !shouldPause) {
      const speed = isScrollMode ? 0.0002 : 0.0005
      meshRef.current.rotation.y += speed
    }
  })

  if (!scene) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color="#0a5c3d" wireframe />
      </mesh>
    )
  }

  return (
    <group ref={meshRef}>
      <primitive 
        object={scene} 
        scale={[0.02, 0.02, 0.02]} 
        position={[0, -70, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

// Preload
useGLTF.preload('https://966ybesamcxuuekz.public.blob.vercel-storage.com/tree-ultra-zuCz4vh0vJBxIEeMvIj4Tj5ZO4StVb.glb')