// src/Hooks/useGLTFPreloader.ts - Optimized with realistic 30-second progress
'use client'

import { useState, useEffect, useRef } from 'react'

export function useGLTFPreloader() {
 const [isLoaded, setIsLoaded] = useState(false)
 const [progress, setProgress] = useState(0)
 const [loadingStatus, setLoadingStatus] = useState('Initializing...')
 const progressRef = useRef(0)

 useEffect(() => {
  if (typeof window === 'undefined') {
    return
  }
  
   let isMounted = true
   let progressInterval: NodeJS.Timeout
   const overallStartTime = Date.now()
   
   const logTiming = (message: string, stepStartTime?: number) => {
     const totalElapsed = Date.now() - overallStartTime
     const stepElapsed = stepStartTime ? Date.now() - stepStartTime : 0
     const stepInfo = stepStartTime ? ` (step: ${stepElapsed}ms)` : ''
     console.log(`⏱️ [${totalElapsed}ms] ${message}${stepInfo}`)
   }
   
   const simulateProgressSmooth = (startProgress: number, endProgress: number, duration: number) => {
     const startTime = Date.now()
     const progressDiff = endProgress - startProgress
     
     if (progressInterval) clearInterval(progressInterval)
     
     progressInterval = setInterval(() => {
       if (!isMounted) {
         clearInterval(progressInterval)
         return
       }
       
       const elapsed = Date.now() - startTime
       const progressPercent = Math.min(elapsed / duration, 1)
       
       const easedProgress = 1 - Math.pow(1 - progressPercent, 2)
       const currentProgress = startProgress + (progressDiff * easedProgress)
       
       const roundedProgress = Math.round(currentProgress)
       progressRef.current = roundedProgress
       setProgress(roundedProgress)
       
       if (progressPercent >= 1) {
         clearInterval(progressInterval)
       }
     }, 100)
   }
   
   const loadModel = async () => {
     try {
       logTiming('🚀 GLTF preload process started')
       setLoadingStatus('Initializing connection...')
       
       // Start initial progress (0-15% in 2 seconds)
       simulateProgressSmooth(0, 15, 2000)
       
       // Initial delay
       const delayStartTime = Date.now()
       logTiming('⏸️ Initial delay starting...', delayStartTime)
       await new Promise(resolve => setTimeout(resolve, 1000))
       logTiming('⏸️ Initial delay completed', delayStartTime)
       
       // Start fetch
       const fetchStartTime = Date.now()
       logTiming('📥 Starting fetch request to Vercel Blob', fetchStartTime)
       setLoadingStatus('Downloading 345MB 3D model...')
       
       // Progress during download (15-85% over expected download time)
       simulateProgressSmooth(15, 85, 25000) // 25 seconds for download
       
       const response = await fetch('https://966ybesamcxuuekz.public.blob.vercel-storage.com/tree-ultra-zuCz4vh0vJBxIEeMvIj4Tj5ZO4StVb.glb')
       logTiming('📥 Fetch response received', fetchStartTime)
       
       if (!response.ok) {
         throw new Error(`Failed to fetch GLTF: ${response.status} ${response.statusText}`)
       }
       
       if (!response.body) {
         throw new Error('Response body is null')
       }
       
       // Start reading response body
       const readStartTime = Date.now()
       logTiming('📖 Starting to read response body stream', readStartTime)
       setLoadingStatus('Streaming model data...')
       
       const reader = response.body.getReader()
       let receivedLength = 0
       const chunks = []
       let chunkCount = 0
       const contentLength = parseInt(response.headers.get('content-length') || '0')
       
       while (true) {
         const chunkStartTime = Date.now()
         const { done, value } = await reader.read()
         
         if (done) {
           logTiming('📖 Stream reading completed - no more chunks', readStartTime)
           break
         }
         
         chunks.push(value)
         receivedLength += value.length
         chunkCount++
         
         // Update progress based on actual download progress
         if (contentLength > 0) {
           const downloadProgress = (receivedLength / contentLength) * 70 + 15 // 15-85%
           if (downloadProgress > progressRef.current) {
             setProgress(Math.round(downloadProgress))
             progressRef.current = Math.round(downloadProgress)
           }
         }
         
         if (chunkCount % 50 === 0 || chunkCount <= 10) { // Less frequent logging
           logTiming(`📦 Chunk ${chunkCount}: ${value.length} bytes (total: ${receivedLength} bytes)`, chunkStartTime)
         }
       }
       
       logTiming(`📥 All data received: ${chunkCount} chunks, ${receivedLength} total bytes`, readStartTime)
       setLoadingStatus('Processing model geometry...')
       
       // Progress for processing (85-90%)
       simulateProgressSmooth(85, 90, 1000)
       
       // Process the chunks
       const processStartTime = Date.now()
       logTiming('🔄 Starting to process chunks into Uint8Array', processStartTime)
       
       const chunksAll = new Uint8Array(receivedLength)
       let position = 0
       for (const chunk of chunks) {
         chunksAll.set(chunk, position)
         position += chunk.length
       }
       
       logTiming('🔄 Chunks processed into Uint8Array', processStartTime)
       
       // Parse JSON
       const parseStartTime = Date.now()
       logTiming('📋 Starting JSON parsing', parseStartTime)
       setLoadingStatus('Parsing 3D structure...')
       
       const text = new TextDecoder().decode(chunksAll)
       const gltfData = JSON.parse(text)
       
       logTiming('📋 JSON parsing completed', parseStartTime)
       logTiming(`📊 GLTF structure: ${Object.keys(gltfData).length} root properties`)
       
       if (gltfData.scenes) logTiming(`   - Scenes: ${gltfData.scenes.length}`)
       if (gltfData.nodes) logTiming(`   - Nodes: ${gltfData.nodes.length}`)
       if (gltfData.meshes) logTiming(`   - Meshes: ${gltfData.meshes.length}`)
       if (gltfData.materials) logTiming(`   - Materials: ${gltfData.materials.length}`)
       if (gltfData.buffers) logTiming(`   - Buffers: ${gltfData.buffers.length}`)
       
       setLoadingStatus('Loading into GPU memory...')
       
       // Progress for Three.js loading (90-95%)
       simulateProgressSmooth(90, 95, 2000)
       
       // Three.js loading (the heavy part)
       const threejsStartTime = Date.now()
       logTiming('🎨 Starting Three.js/drei import', threejsStartTime)
       
       const { useGLTF } = await import('@react-three/drei')
       logTiming('🎨 @react-three/drei imported', threejsStartTime)
       
       const gltfPreloadStartTime = Date.now()
       logTiming('🏗️ Starting useGLTF.preload()', gltfPreloadStartTime)
       
       await useGLTF.preload('https://966ybesamcxuuekz.public.blob.vercel-storage.com/tree-ultra-zuCz4vh0vJBxIEeMvIj4Tj5ZO4StVb.glb')
       
       logTiming('🏗️ useGLTF.preload() completed', gltfPreloadStartTime)
       logTiming('🎨 All Three.js operations completed', threejsStartTime)
       
       // Finish up
       clearInterval(progressInterval)
       setLoadingStatus('Optimizing render performance...')
       
       const finishStartTime = Date.now()
       logTiming('🏁 Starting final progress to 100%', finishStartTime)
       
       // Final progress (95-100%)
       simulateProgressSmooth(95, 100, 800)
       await new Promise(resolve => setTimeout(resolve, 800))
       
       if (isMounted) {
         clearInterval(progressInterval)
         logTiming('🏁 Finalizing completed', finishStartTime)
         logTiming('🎉 ENTIRE GLTF PRELOAD PROCESS COMPLETED')
         
         setProgress(100)
         setLoadingStatus('Ready to explore!')
         
         setTimeout(() => {
           if (isMounted) {
             logTiming('🚪 Marking as loaded - user will see content now')
             setIsLoaded(true)
           }
         }, 500)
       }
       
     } catch (error) {
       logTiming('❌ ERROR occurred during loading process')
       console.error('❌ Full error details:', error)
       clearInterval(progressInterval)
       
       if (isMounted) {
         setProgress(100)
         setLoadingStatus('Loading complete!')
         setIsLoaded(true)
       }
     }
   }

   loadModel()
   
   return () => {
     logTiming('🧹 Cleanup: GLTF preloader unmounting')
     clearInterval(progressInterval)
     isMounted = false
   }
 }, []) // Removed progress dependency

 return { isLoaded, progress, loadingStatus }
}