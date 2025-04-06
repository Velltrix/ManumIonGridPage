'use client'

import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface BrittlenessAnimationProps {
  speed?: number
}

const BrittlenessAnimation: React.FC<BrittlenessAnimationProps> = ({
  speed = 1
}) => {
  const [animationState, setAnimationState] = useState<'initial' | 'shifted' | 'broken'>('initial')
  const [isPlaying, setIsPlaying] = useState(false)
  
  const controls = useAnimation()
  
  // Create a grid of ions
  const rows = 5
  const cols = 5
  
  // Generate grid data
  const generateGrid = (state: 'initial' | 'shifted' | 'broken') => {
    const grid = []
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isEven = (row + col) % 2 === 0
        const type = isEven ? 'cation' : 'anion'
        
        // Calculate position based on state
        let x = col * 40
        let y = row * 40
        
        if (state === 'shifted' || state === 'broken') {
          // Shift the middle row to the right
          if (row === 2) {
            x += 20
          }
        }
        
        if (state === 'broken') {
          // Add random displacement for broken state
          if (row >= 2) {
            x += Math.random() * 100 - 50
            y += Math.random() * 100 - 50
          }
        }
        
        grid.push({
          id: `ion-${row}-${col}`,
          type,
          x,
          y,
          element: type === 'cation' ? 'Na+' : 'Cl-',
          color: type === 'cation' ? '#9c59ff' : '#59ff8e'
        })
      }
    }
    
    return grid
  }
  
  const [grid, setGrid] = useState(generateGrid('initial'))
  
  const playAnimation = async () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    setAnimationState('initial')
    setGrid(generateGrid('initial'))
    
    // Wait a moment in initial state
    await new Promise(resolve => setTimeout(resolve, 1000 / speed))
    
    // Shift to middle state
    setAnimationState('shifted')
    setGrid(generateGrid('shifted'))
    
    // Wait a moment in shifted state
    await new Promise(resolve => setTimeout(resolve, 1000 / speed))
    
    // Break the crystal
    setAnimationState('broken')
    setGrid(generateGrid('broken'))
    
    // Reset after animation completes
    setTimeout(() => {
      setIsPlaying(false)
      setAnimationState('initial')
      setGrid(generateGrid('initial'))
    }, 3000 / speed)
  }
  
  return (
    <div className="brittleness-animation relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {grid.map((ion) => (
          <motion.div
            key={ion.id}
            className={`ion ${ion.type} absolute rounded-full flex items-center justify-center text-xs font-bold text-white`}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: ion.color,
              boxShadow: `0 0 10px ${ion.color}80`,
              x: ion.x,
              y: ion.y,
              zIndex: ion.type === 'cation' ? 2 : 1
            }}
            animate={{
              x: ion.x,
              y: ion.y,
              opacity: animationState === 'broken' && ion.type === 'cation' && ion.y > 80 ? 0.5 : 1,
              scale: animationState === 'broken' && ion.type === 'cation' && ion.y > 80 ? 0.8 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10
            }}
          >
            {ion.element}
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
          onClick={playAnimation}
          disabled={isPlaying}
        >
          {isPlaying ? 'Playing...' : 'Show Brittleness'}
        </button>
      </div>
      
      <div className="absolute top-4 left-4 text-sm font-medium">
        {animationState === 'initial' && 'Stable Crystal Structure'}
        {animationState === 'shifted' && 'Force Applied - Layers Shifting'}
        {animationState === 'broken' && 'Crystal Shatters Due to Like-Charge Repulsion'}
      </div>
    </div>
  )
}

export default BrittlenessAnimation
