'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CrystalInfoCardProps {
  title: string
  formula: string
  structure: string
  coordinationNumber: string
  properties: string[]
  image?: string
}

const CrystalInfoCard: React.FC<CrystalInfoCardProps> = ({
  title,
  formula,
  structure,
  coordinationNumber,
  properties,
  image
}) => {
  return (
    <motion.div 
      className="crystal-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mb-4">
          {formula}
        </div>
        
        <div className="mb-4">
          {image ? (
            <img 
              src={image} 
              alt={`${title} structure`} 
              className="w-full h-48 object-cover rounded-md"
            />
          ) : (
            <div className="structure-placeholder h-48 flex items-center justify-center">
              {title} Structure
            </div>
          )}
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Structure:</span> {structure}
          </div>
          <div>
            <span className="font-semibold">Coordination Number:</span> {coordinationNumber}
          </div>
          
          <div>
            <span className="font-semibold">Properties:</span>
            <ul className="list-disc pl-5 mt-1">
              {properties.map((property, index) => (
                <li key={index}>{property}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CrystalInfoCard
