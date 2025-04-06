'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

interface InteractiveTabProps {
  title: string
  children: React.ReactNode
}

const InteractiveTab: React.FC<InteractiveTabProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  
  return (
    <Card className="overflow-hidden">
      <div 
        className="p-4 bg-blue-600 text-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {isOpen && (
        <CardContent className="p-4">
          {children}
        </CardContent>
      )}
    </Card>
  )
}

export default InteractiveTab
