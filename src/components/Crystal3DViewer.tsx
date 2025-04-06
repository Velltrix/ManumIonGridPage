'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

interface Crystal3DViewerProps {
  structure: 'nacl' | 'cscl' | 'caf2' | 'tio2'
  size?: number
  rotationSpeed?: number
}

const Crystal3DViewer: React.FC<Crystal3DViewerProps> = ({
  structure = 'nacl',
  size = 3,
  rotationSpeed = 0.005
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const frameIdRef = useRef<number | null>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return
    
    try {
      // Create scene
      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x111827) // dark background
      sceneRef.current = scene
      
      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75, 
        containerRef.current.clientWidth / containerRef.current.clientHeight, 
        0.1, 
        1000
      )
      camera.position.z = 5
      cameraRef.current = camera
      
      // Create renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      containerRef.current.appendChild(renderer.domElement)
      rendererRef.current = renderer
      
      // Add orbit controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controlsRef.current = controls
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)
      
      // Create crystal structure
      createCrystalStructure(structure, size)
      
      // Animation loop
      const animate = () => {
        frameIdRef.current = requestAnimationFrame(animate)
        
        if (controlsRef.current) {
          controlsRef.current.update()
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current)
        }
      }
      
      animate()
      setIsLoading(false)
      
      // Handle window resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
        
        cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      }
      
      window.addEventListener('resize', handleResize)
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize)
        
        if (frameIdRef.current) {
          cancelAnimationFrame(frameIdRef.current)
        }
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement)
        }
        
        if (sceneRef.current) {
          // Dispose of all geometries and materials
          sceneRef.current.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              if (object.geometry) {
                object.geometry.dispose()
              }
              
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach(material => material.dispose())
                } else {
                  object.material.dispose()
                }
              }
            }
          })
        }
      }
    } catch (err) {
      console.error('Error initializing 3D viewer:', err)
      setError('Failed to initialize 3D viewer')
      setIsLoading(false)
    }
  }, [])
  
  // Update crystal structure when structure or size changes
  useEffect(() => {
    if (!sceneRef.current) return
    
    // Clear existing structure
    const objectsToRemove = []
    sceneRef.current.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        objectsToRemove.push(object)
      }
    })
    
    objectsToRemove.forEach(object => {
      sceneRef.current?.remove(object)
    })
    
    // Create new structure
    createCrystalStructure(structure, size)
  }, [structure, size])
  
  const createCrystalStructure = (structureType: string, gridSize: number) => {
    if (!sceneRef.current) return
    
    try {
      switch (structureType) {
        case 'nacl': // Sodium Chloride (Rock Salt) Structure
          createNaClStructure(gridSize)
          break
          
        case 'cscl': // Cesium Chloride Structure
          createCsClStructure(gridSize)
          break
          
        case 'caf2': // Calcium Fluoride (Fluorite) Structure
          createCaF2Structure(gridSize)
          break
          
        case 'tio2': // Titanium Dioxide (Rutile) Structure
          createTiO2Structure(gridSize)
          break
          
        default:
          createNaClStructure(gridSize)
      }
    } catch (err) {
      console.error('Error creating crystal structure:', err)
      setError(`Failed to create ${structureType} structure`)
    }
  }
  
  const createNaClStructure = (gridSize: number) => {
    if (!sceneRef.current) return
    
    const scene = sceneRef.current
    
    // Create materials
    const cationMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9c59ff,
      shininess: 100,
      emissive: 0x3a0070,
      emissiveIntensity: 0.2
    })
    
    const anionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x59ff8e,
      shininess: 100,
      emissive: 0x007030,
      emissiveIntensity: 0.2
    })
    
    // Create geometries
    const cationGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const anionGeometry = new THREE.SphereGeometry(0.3, 32, 32) // Anions are typically larger
    
    // Center offset to keep structure centered
    const offset = gridSize / 2 - 0.5
    
    // Create NaCl structure
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // In NaCl, if sum of coordinates is even, it's Na+, otherwise Cl-
          const isEven = (x + y + z) % 2 === 0
          
          const geometry = isEven ? cationGeometry : anionGeometry
          const material = isEven ? cationMaterial : anionMaterial
          
          const ion = new THREE.Mesh(geometry, material)
          ion.position.set(
            x - offset,
            y - offset,
            z - offset
          )
          
          scene.add(ion)
        }
      }
    }
  }
  
  const createCsClStructure = (gridSize: number) => {
    if (!sceneRef.current) return
    
    const scene = sceneRef.current
    
    // Create materials
    const cationMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff9c59,
      shininess: 100,
      emissive: 0x703000,
      emissiveIntensity: 0.2
    })
    
    const anionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x59ff8e,
      shininess: 100,
      emissive: 0x007030,
      emissiveIntensity: 0.2
    })
    
    // Create geometries
    const cationGeometry = new THREE.SphereGeometry(0.3, 32, 32) // Cs+ is larger
    const anionGeometry = new THREE.SphereGeometry(0.25, 32, 32)
    
    // Center offset to keep structure centered
    const offset = gridSize / 2 - 0.5
    
    // Create CsCl structure
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // In CsCl, cations at corners, anions at body centers
          if (x % 2 === 0 && y % 2 === 0 && z % 2 === 0) {
            const cation = new THREE.Mesh(cationGeometry, cationMaterial)
            cation.position.set(
              x - offset,
              y - offset,
              z - offset
            )
            scene.add(cation)
          } else if (x % 2 === 1 && y % 2 === 1 && z % 2 === 1) {
            const anion = new THREE.Mesh(anionGeometry, anionMaterial)
            anion.position.set(
              x - offset,
              y - offset,
              z - offset
            )
            scene.add(anion)
          }
        }
      }
    }
  }
  
  const createCaF2Structure = (gridSize: number) => {
    if (!sceneRef.current) return
    
    const scene = sceneRef.current
    
    // Create materials
    const cationMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff5959,
      shininess: 100,
      emissive: 0x700000,
      emissiveIntensity: 0.2
    })
    
    const anionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x59c2ff,
      shininess: 100,
      emissive: 0x004070,
      emissiveIntensity: 0.2
    })
    
    // Create geometries
    const cationGeometry = new THREE.SphereGeometry(0.25, 32, 32)
    const anionGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    
    // Center offset to keep structure centered
    const offset = gridSize / 2 - 0.5
    
    // Create CaF2 structure (simplified)
    for (let x = 0; x < gridSize; x += 1) {
      for (let y = 0; y < gridSize; y += 1) {
        for (let z = 0; z < gridSize; z += 1) {
          // Ca2+ at FCC positions
          if ((x % 2 === 0 && y % 2 === 0 && z % 2 === 0) || 
              (x % 2 === 0 && y % 2 === 1 && z % 2 === 1) ||
              (x % 2 === 1 && y % 2 === 0 && z % 2 === 1) ||
              (x % 2 === 1 && y % 2 === 1 && z % 2 === 0)) {
            const cation = new THREE.Mesh(cationGeometry, cationMaterial)
            cation.position.set(
              x - offset,
              y - offset,
              z - offset
            )
            scene.add(cation)
          }
          
          // F- at tetrahedral sites
          if (x % 2 === 0 && y % 2 === 0 && z % 2 === 0) {
            const positions = [
              [0.25, 0.25, 0.25],
              [0.25, 0.75, 0.75],
              [0.75, 0.25, 0.75],
              [0.75, 0.75, 0.25]
            ]
            
            positions.forEach(pos => {
              const anion = new THREE.Mesh(anionGeometry, anionMaterial)
              anion.position.set(
                x + pos[0] - offset,
                y + pos[1] - offset,
                z + pos[2] - offset
              )
              scene.add(anion)
            })
          }
        }
      }
    }
  }
  
  const createTiO2Structure = (gridSize: number) => {
    if (!sceneRef.current) return
    
    const scene = sceneRef.current
    
    // Create materials
    const cationMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xa0a0a0,
      shininess: 100,
      emissive: 0x303030,
      emissiveIntensity: 0.2
    })
    
    const anionMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff5959,
      shininess: 100,
      emissive: 0x700000,
      emissiveIntensity: 0.2
    })
    
    // Create geometries
    const cationGeometry = new THREE.SphereGeometry(0.2, 32, 32)
    const anionGeometry = new THREE.SphereGeometry(0.25, 32, 32)
    
    // Center offset to keep structure centered
    const offset = gridSize / 2 - 0.5
    
    // Create simplified TiO2 structure
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Ti4+ ions at specific positions
          if ((x + y + z) % 2 === 0) {
            const cation = new THREE.Mesh(cationGeometry, cationMaterial)
            cation.position.set(
              x - offset,
              y - offset,
              z - offset
            )
            scene.add(cation)
            
            // Add O2- ions around Ti4+
            if (x < gridSize - 1) {
              const anion1 = new THREE.Mesh(anionGeometry, anionMaterial)
              anion1.position.set(
                x + 0.5 - offset,
                y - offset,
                z - offset
              )
              scene.add(anion1)
            }
            
            if (y < gridSize - 1) {
              const anion2 = new THREE.Mesh(anionGeometry, anionMaterial)
              anion2.position.set(
                x - offset,
                y + 0.5 - offset,
                z - offset
              )
              scene.add(anion2)
            }
          }
        }
      }
    }
  }
  
  return (
    <div className="crystal-3d-viewer relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="text-white">Loading...</div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-800 bg-opacity-50 z-10">
          <div className="text-white">{error}</div>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-md overflow-hidden"
      />
      
      <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
        Drag to rotate | Scroll to zoom
      </div>
    </div>
  )
}

export default Crystal3DViewer
