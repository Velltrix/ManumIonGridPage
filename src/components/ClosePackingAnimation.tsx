'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface ClosePackingAnimationProps {
  type?: 'hcp' | 'ccp'
}

const ClosePackingAnimation: React.FC<ClosePackingAnimationProps> = ({
  type = 'hcp'
}) => {
  const [packingType, setPackingType] = useState<'hcp' | 'ccp'>(type)
  const [showLabels, setShowLabels] = useState(true)
  const [view, setView] = useState<'top' | 'side' | '3d'>('top')
  
  // Generate atoms for the packing structure
  const generateAtoms = () => {
    const atoms = []
    const layerColors = ['#ff5959', '#59c2ff', '#59ff8e']
    
    // First layer (A) - same for both HCP and CCP
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        atoms.push({
          id: `atom-A-${row}-${col}`,
          layer: 'A',
          x: col * 40 + (row % 2 === 0 ? 0 : 20),
          y: row * 35,
          z: 0,
          color: layerColors[0]
        })
      }
    }
    
    // Second layer (B) - same for both HCP and CCP
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        atoms.push({
          id: `atom-B-${row}-${col}`,
          layer: 'B',
          x: col * 40 + (row % 2 === 1 ? 0 : 20),
          y: row * 35,
          z: 30,
          color: layerColors[1]
        })
      }
    }
    
    // Third layer - different for HCP (A) and CCP (C)
    const thirdLayerType = packingType === 'hcp' ? 'A' : 'C'
    
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        // For HCP, third layer is directly above first layer (A)
        // For CCP, third layer is in positions not covered by A or B
        const xOffset = packingType === 'hcp' 
          ? (row % 2 === 0 ? 0 : 20) // Same as layer A
          : (row % 2 === 0 ? 20 : 0) // Different from both A and B
        
        atoms.push({
          id: `atom-${thirdLayerType}-${row}-${col}`,
          layer: thirdLayerType,
          x: col * 40 + xOffset,
          y: row * 35,
          z: 60,
          color: layerColors[2]
        })
      }
    }
    
    return atoms
  }
  
  const atoms = generateAtoms()
  
  // Calculate positions based on view
  const getAtomPosition = (atom: any) => {
    if (view === 'top') {
      // Top view - only x and y matter
      return {
        x: atom.x,
        y: atom.y,
        z: 0,
        scale: 1
      }
    } else if (view === 'side') {
      // Side view - y and z matter
      return {
        x: atom.x,
        y: atom.z,
        z: 0,
        scale: 1
      }
    } else {
      // 3D view - isometric projection
      return {
        x: atom.x - atom.z * 0.5,
        y: atom.y - atom.z * 0.5,
        z: atom.z,
        scale: 1 - atom.z * 0.001
      }
    }
  }
  
  // Sort atoms for proper rendering in 3D view
  const sortedAtoms = [...atoms].sort((a, b) => {
    if (view === '3d') {
      return a.z - b.z // Back to front for 3D view
    }
    return 0
  })
  
  return (
    <div className="close-packing-animation w-full">
      <div className="controls mb-4 flex flex-wrap justify-center gap-2">
        <button
          className={`px-3 py-1 rounded-md ${packingType === 'hcp' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setPackingType('hcp')}
        >
          Hexagonal Close Packing (HCP)
        </button>
        <button
          className={`px-3 py-1 rounded-md ${packingType === 'ccp' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setPackingType('ccp')}
        >
          Cubic Close Packing (CCP)
        </button>
        
        <div className="w-full h-0 md:w-0 md:h-auto"></div>
        
        <button
          className={`px-3 py-1 rounded-md ${view === 'top' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setView('top')}
        >
          Top View
        </button>
        <button
          className={`px-3 py-1 rounded-md ${view === 'side' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setView('side')}
        >
          Side View
        </button>
        <button
          className={`px-3 py-1 rounded-md ${view === '3d' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setView('3d')}
        >
          3D View
        </button>
        
        <button
          className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 ml-2"
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? 'Hide Labels' : 'Show Labels'}
        </button>
      </div>
      
      <div className="animation-container relative h-80 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {sortedAtoms.map((atom) => {
            const position = getAtomPosition(atom)
            
            return (
              <motion.div
                key={atom.id}
                className="atom absolute rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: atom.color,
                  boxShadow: `0 0 10px ${atom.color}80`,
                  zIndex: Math.floor(position.z / 10)
                }}
                initial={{ x: position.x, y: position.y, scale: position.scale }}
                animate={{ 
                  x: position.x, 
                  y: position.y, 
                  scale: position.scale,
                  opacity: view === '3d' ? 1 - (position.z * 0.003) : 1
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              >
                {showLabels && atom.layer}
              </motion.div>
            )
          })}
        </div>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium bg-white dark:bg-gray-800 px-2 py-1 rounded">
          {packingType === 'hcp' ? 'HCP Pattern: ABABAB...' : 'CCP Pattern: ABCABCABC...'}
        </div>
        
        <div className="absolute top-4 right-4 text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: '#ff5959' }}></div>
            <span>Layer A</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: '#59c2ff' }}></div>
            <span>Layer B</span>
          </div>
          {packingType === 'ccp' && (
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: '#59ff8e' }}></div>
              <span>Layer C</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          {packingType === 'hcp' 
            ? 'Hexagonal Close Packing (HCP) has an ABABAB... pattern of layers. Each sphere is surrounded by 12 neighbors.'
            : 'Cubic Close Packing (CCP) has an ABCABCABC... pattern of layers. Each sphere is surrounded by 12 neighbors.'}
        </p>
        <p className="mt-1">
          Both HCP and CCP achieve the maximum packing efficiency of 74%.
        </p>
      </div>
    </div>
  )
}

export default ClosePackingAnimation
