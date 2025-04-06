'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface IonGridProps {
  structure: 'nacl' | 'cscl' | 'tio2' | 'caf2'
  size?: number
  interactive?: boolean
}

interface Ion {
  id: string
  type: 'cation' | 'anion'
  position: [number, number, number]
  element: string
  color: string
}

const IonGrid: React.FC<IonGridProps> = ({ 
  structure = 'nacl', 
  size = 3, 
  interactive = true 
}) => {
  const [ions, setIons] = useState<Ion[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedIon, setSelectedIon] = useState<string | null>(null)

  useEffect(() => {
    // Generate ions based on structure type
    const generatedIons = generateIonStructure(structure, size)
    setIons(generatedIons)
  }, [structure, size])

  const generateIonStructure = (structureType: string, gridSize: number): Ion[] => {
    const result: Ion[] = []
    
    switch (structureType) {
      case 'nacl': // Sodium Chloride (Rock Salt) Structure
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
              // In NaCl, if sum of coordinates is even, it's Na+, otherwise Cl-
              const isEven = (x + y + z) % 2 === 0
              result.push({
                id: `ion-${x}-${y}-${z}`,
                type: isEven ? 'cation' : 'anion',
                position: [x, y, z],
                element: isEven ? 'Na' : 'Cl',
                color: isEven ? '#9c59ff' : '#59ff8e'
              })
            }
          }
        }
        break
        
      case 'cscl': // Cesium Chloride Structure
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
              // In CsCl, Cs+ at corners, Cl- at body center
              if (x === 0 || x === gridSize-1 || 
                  y === 0 || y === gridSize-1 || 
                  z === 0 || z === gridSize-1) {
                result.push({
                  id: `ion-${x}-${y}-${z}`,
                  type: 'cation',
                  position: [x, y, z],
                  element: 'Cs',
                  color: '#ff9c59'
                })
              } else if (x === Math.floor(gridSize/2) && 
                         y === Math.floor(gridSize/2) && 
                         z === Math.floor(gridSize/2)) {
                result.push({
                  id: `ion-${x}-${y}-${z}`,
                  type: 'anion',
                  position: [x, y, z],
                  element: 'Cl',
                  color: '#59ff8e'
                })
              }
            }
          }
        }
        break
        
      case 'caf2': // Calcium Fluoride (Fluorite) Structure
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
              // Ca2+ at FCC positions
              if ((x === 0 || x === gridSize-1) && 
                  (y === 0 || y === gridSize-1) && 
                  (z === 0 || z === gridSize-1)) {
                result.push({
                  id: `ion-${x}-${y}-${z}`,
                  type: 'cation',
                  position: [x, y, z],
                  element: 'Ca',
                  color: '#ff5959'
                })
              }
              
              // F- at tetrahedral sites
              if (x % 2 === 0 && y % 2 === 0 && z % 2 === 0) {
                result.push({
                  id: `ion-${x}-${y}-${z}-f1`,
                  type: 'anion',
                  position: [x + 0.25, y + 0.25, z + 0.25],
                  element: 'F',
                  color: '#59c2ff'
                })
                
                result.push({
                  id: `ion-${x}-${y}-${z}-f2`,
                  type: 'anion',
                  position: [x + 0.75, y + 0.75, z + 0.25],
                  element: 'F',
                  color: '#59c2ff'
                })
              }
            }
          }
        }
        break
        
      case 'tio2': // Titanium Dioxide (Rutile) Structure
        // Simplified rutile structure
        for (let x = 0; x < gridSize; x++) {
          for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < gridSize; z++) {
              // Ti4+ ions
              if ((x + y + z) % 2 === 0) {
                result.push({
                  id: `ion-${x}-${y}-${z}-ti`,
                  type: 'cation',
                  position: [x, y, z],
                  element: 'Ti',
                  color: '#a0a0a0'
                })
              }
              
              // O2- ions
              if ((x + y + z) % 2 === 1) {
                result.push({
                  id: `ion-${x}-${y}-${z}-o`,
                  type: 'anion',
                  position: [x, y, z],
                  element: 'O',
                  color: '#ff5959'
                })
              }
            }
          }
        }
        break
        
      default:
        // Default to NaCl structure
        return generateIonStructure('nacl', gridSize)
    }
    
    return result
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (interactive) {
      setIsDragging(true)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && interactive) {
      setRotation({
        x: rotation.x + e.movementY * 0.5,
        y: rotation.y + e.movementX * 0.5
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleIonClick = (id: string) => {
    if (interactive) {
      setSelectedIon(selectedIon === id ? null : id)
    }
  }

  return (
    <div 
      className="ion-grid-container w-full h-full flex items-center justify-center"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ 
        perspective: '1000px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <motion.div
        className="ion-grid relative"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {ions.map((ion) => {
          const scale = selectedIon === ion.id ? 1.3 : 1
          const zIndex = selectedIon === ion.id ? 10 : 1
          
          return (
            <motion.div
              key={ion.id}
              className={`ion ${ion.type} absolute rounded-full flex items-center justify-center font-bold text-white`}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: ion.color,
                transform: `translate3d(
                  ${ion.position[0] * 40}px, 
                  ${ion.position[1] * 40}px, 
                  ${ion.position[2] * 40}px
                ) scale(${scale})`,
                boxShadow: `0 0 10px ${ion.color}80`,
                zIndex,
                cursor: interactive ? 'pointer' : 'default'
              }}
              onClick={() => handleIonClick(ion.id)}
              whileHover={interactive ? { scale: 1.2 } : {}}
              transition={{ duration: 0.2 }}
            >
              {ion.element}
            </motion.div>
          )
        })}
      </motion.div>
      
      {selectedIon && (
        <div className="ion-info absolute bottom-4 left-4 bg-black bg-opacity-70 text-white p-2 rounded">
          {ions.find(ion => ion.id === selectedIon)?.element} ({ions.find(ion => ion.id === selectedIon)?.type})
        </div>
      )}
    </div>
  )
}

export default IonGrid
