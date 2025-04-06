'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ConductivityAnimationProps {
  speed?: number
}

const ConductivityAnimation: React.FC<ConductivityAnimationProps> = ({
  speed = 1
}) => {
  const [state, setState] = useState<'solid' | 'solution' | 'molten'>('solid')
  const [isLightOn, setIsLightOn] = useState(false)
  
  // Generate ions
  const generateIons = (count: number, state: 'solid' | 'solution' | 'molten') => {
    const ions = []
    const width = 300
    const height = 200
    
    for (let i = 0; i < count; i++) {
      const isCation = i % 2 === 0
      
      let x, y
      
      if (state === 'solid') {
        // Organized grid for solid
        const row = Math.floor(i / 8)
        const col = i % 8
        x = col * 35 + 20
        y = row * 35 + 20
      } else if (state === 'solution') {
        // Random positions for solution, but with some flow toward electrodes
        x = Math.random() * width
        y = Math.random() * height
      } else {
        // Random positions for molten state
        x = Math.random() * width
        y = Math.random() * height
      }
      
      ions.push({
        id: `ion-${i}`,
        type: isCation ? 'cation' : 'anion',
        x,
        y,
        element: isCation ? 'Na+' : 'Cl-',
        color: isCation ? '#9c59ff' : '#59ff8e'
      })
    }
    
    return ions
  }
  
  const [ions, setIons] = useState(generateIons(24, 'solid'))
  
  // Update ions when state changes
  useEffect(() => {
    setIons(generateIons(24, state))
    
    // Determine if light should be on
    setIsLightOn(state !== 'solid')
    
    // Start animation for solution or molten state
    if (state !== 'solid') {
      const interval = setInterval(() => {
        setIons(prev => {
          return prev.map(ion => {
            // Move ions toward respective electrodes in solution or molten state
            let newX = ion.x
            let newY = ion.y
            
            if (ion.type === 'cation') {
              // Cations move toward negative electrode (left)
              newX = Math.max(0, ion.x - (Math.random() * 5 * speed))
            } else {
              // Anions move toward positive electrode (right)
              newX = Math.min(300, ion.x + (Math.random() * 5 * speed))
            }
            
            // Add some random movement
            newY = Math.max(0, Math.min(200, ion.y + (Math.random() * 10 - 5)))
            
            return {
              ...ion,
              x: newX,
              y: newY
            }
          })
        })
      }, 100 / speed)
      
      return () => clearInterval(interval)
    }
  }, [state, speed])
  
  return (
    <div className="conductivity-animation w-full">
      <div className="controls mb-4 flex justify-center space-x-4">
        <button
          className={`px-3 py-1 rounded-md ${state === 'solid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setState('solid')}
        >
          Solid
        </button>
        <button
          className={`px-3 py-1 rounded-md ${state === 'solution' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setState('solution')}
        >
          Solution
        </button>
        <button
          className={`px-3 py-1 rounded-md ${state === 'molten' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          onClick={() => setState('molten')}
        >
          Molten
        </button>
      </div>
      
      <div className="animation-container relative h-64 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        {/* Electrodes */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gray-400 dark:bg-gray-500 flex items-center justify-center text-xs">
          -
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gray-400 dark:bg-gray-500 flex items-center justify-center text-xs">
          +
        </div>
        
        {/* Container - blue for solution, orange for molten */}
        {state !== 'solid' && (
          <div 
            className={`absolute inset-4 rounded-md ${state === 'solution' ? 'bg-blue-100 dark:bg-blue-900 bg-opacity-30 dark:bg-opacity-30' : 'bg-orange-100 dark:bg-orange-900 bg-opacity-30 dark:bg-opacity-30'}`}
          />
        )}
        
        {/* Ions */}
        {ions.map((ion) => (
          <motion.div
            key={ion.id}
            className={`ion ${ion.type} absolute rounded-full flex items-center justify-center text-xs font-bold text-white`}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: ion.color,
              boxShadow: `0 0 10px ${ion.color}80`,
              zIndex: 10
            }}
            initial={{ x: ion.x, y: ion.y }}
            animate={{ 
              x: ion.x, 
              y: ion.y,
              transition: { 
                type: state === 'solid' ? 'spring' : 'tween',
                duration: 0.2
              }
            }}
          >
            {ion.element}
          </motion.div>
        ))}
        
        {/* Light bulb */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div 
            className={`w-12 h-12 rounded-full ${isLightOn ? 'bg-yellow-300 dark:bg-yellow-300' : 'bg-gray-300 dark:bg-gray-600'}`}
            style={{
              boxShadow: isLightOn ? '0 0 20px rgba(255, 255, 0, 0.8)' : 'none'
            }}
          />
          <div className="w-4 h-6 bg-gray-400 dark:bg-gray-500 mt-1" />
          <div className="text-xs mt-1">{isLightOn ? 'ON' : 'OFF'}</div>
        </div>
        
        {/* State label */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-medium">
          {state === 'solid' && 'Solid NaCl: No conductivity - ions fixed in place'}
          {state === 'solution' && 'NaCl in water: Conducts electricity - ions are mobile'}
          {state === 'molten' && 'Molten NaCl: Conducts electricity - ions are mobile'}
        </div>
      </div>
    </div>
  )
}

export default ConductivityAnimation
