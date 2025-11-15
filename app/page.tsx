// src/app/page.tsx - Advanced with progress tracking
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    let isMounted = true

    const preloadEverything = async () => {
      try {
        // Step 1: Prefetch routes (20% progress)
        if (isMounted) {
          setStatus('Loading routes...')
          setProgress(10)
        }

        const routes = ['/home', '/tree', '/web3', '/contact']
        await Promise.all(routes.map(route => router.prefetch(route)))
        
        if (isMounted) setProgress(20)

        // Step 2: Preload 3D model (60% progress total)
        if (isMounted) {
          setStatus('Loading 3D model...')
          setProgress(25)
        }

        const modelUrl = 'https://966ybesamcxuuekz.public.blob.vercel-storage.com/tree-ultra-zuCz4vh0vJBxIEeMvIj4Tj5ZO4StVb.glb'
        
        const response = await fetch(modelUrl, {
          method: 'GET',
          cache: 'force-cache'
        })

        if (!response.ok) throw new Error('Model fetch failed')

        const contentLength = parseInt(response.headers.get('content-length') || '0')
        const reader = response.body?.getReader()
        let receivedLength = 0

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            
            receivedLength += value.length
            
            if (isMounted && contentLength > 0) {
              // Progress from 25% to 80% based on download
              const downloadProgress = (receivedLength / contentLength) * 55
              setProgress(25 + downloadProgress)
            }
          }
        }

        if (isMounted) setProgress(80)

        // Step 3: Preload Three.js modules (90% progress)
        if (isMounted) {
          setStatus('Loading 3D engine...')
          setProgress(85)
        }

        await Promise.all([
          import('@react-three/fiber'),
          import('@react-three/drei'),
          import('three')
        ])

        if (isMounted) setProgress(90)

        // Step 4: Complete (100%)
        if (isMounted) {
          setStatus('Ready!')
          setProgress(100)
        }

        // Wait a moment before redirecting
        await new Promise(resolve => setTimeout(resolve, 300))

        if (isMounted) {
          router.push('/home')
        }

      } catch (error) {
        console.error('Preload error:', error)
        // Redirect anyway even if preloading fails
        if (isMounted) {
          setStatus('Loading...')
          setTimeout(() => router.push('/home'), 500)
        }
      }
    }

    preloadEverything()

    return () => {
      isMounted = false
    }
  }, [router])

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="text-center space-y-6 px-6">
        {/* Logo or brand */}
        <div className="text-white text-3xl md:text-4xl font-bold mb-8">
          TREETINO
        </div>

        {/* Status text */}
        <div className="text-white/60 text-sm md:text-base font-light">
          {status}
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-2 bg-white/5 rounded-full overflow-hidden mx-auto border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-[#2762AD] via-[#183D89] to-[#2762AD] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-[#2762AD] text-sm font-semibold">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}