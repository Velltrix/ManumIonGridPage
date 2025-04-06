'use client'

import React, { useEffect, useRef } from 'react'

interface AtomAnimationProps {
  element: string
  electrons: number
  color: string
  electronColor: string
  size?: 'small' | 'medium' | 'large'
}

const AtomAnimation: React.FC<AtomAnimationProps> = ({
  element,
  electrons,
  color,
  electronColor,
  size = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Size mapping
  const sizeMap = {
    small: { width: 100, height: 100, nucleusRadius: 15, electronRadius: 3 },
    medium: { width: 200, height: 200, nucleusRadius: 30, electronRadius: 5 },
    large: { width: 300, height: 300, nucleusRadius: 45, electronRadius: 8 }
  }
  
  const { width, height, nucleusRadius, electronRadius } = sizeMap[size]
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    canvas.width = width
    canvas.height = height
    
    // Center coordinates
    const centerX = width / 2
    const centerY = height / 2
    
    // Calculate orbits based on electron count
    const orbits = Math.min(3, Math.ceil(electrons / 8))
    const electronsPerOrbit = []
    
    let remainingElectrons = electrons
    for (let i = 0; i < orbits; i++) {
      const orbitElectrons = Math.min(remainingElectrons, 8)
      electronsPerOrbit.push(orbitElectrons)
      remainingElectrons -= orbitElectrons
    }
    
    // Animation variables
    let animationFrameId: number
    const orbitSpeeds = [0.005, 0.003, 0.002]
    const orbitAngles = Array(orbits).fill(0)
    
    // Animation function
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw nucleus
      ctx.beginPath()
      ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()
      
      // Draw element symbol
      ctx.font = `${nucleusRadius}px Arial`
      ctx.fillStyle = 'white'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(element, centerX, centerY)
      
      // Draw orbits and electrons
      for (let i = 0; i < orbits; i++) {
        const orbitRadius = nucleusRadius * (i + 2)
        
        // Draw orbit path
        ctx.beginPath()
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
        ctx.stroke()
        
        // Update orbit angle
        orbitAngles[i] += orbitSpeeds[i]
        
        // Draw electrons
        const electronCount = electronsPerOrbit[i]
        for (let j = 0; j < electronCount; j++) {
          const angle = orbitAngles[i] + (j * (Math.PI * 2) / electronCount)
          const x = centerX + Math.cos(angle) * orbitRadius
          const y = centerY + Math.sin(angle) * orbitRadius
          
          ctx.beginPath()
          ctx.arc(x, y, electronRadius, 0, Math.PI * 2)
          ctx.fillStyle = electronColor
          ctx.fill()
        }
      }
      
      animationFrameId = window.requestAnimationFrame(render)
    }
    
    render()
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [element, electrons, color, electronColor, width, height, nucleusRadius, electronRadius])
  
  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height}
      className="mx-auto"
    />
  )
}

export default AtomAnimation
