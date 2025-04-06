'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Atom, Beaker, Grid3X3, Zap } from 'lucide-react'
import AtomAnimation from '@/components/AtomAnimation'
import InteractiveTab from '@/components/InteractiveTab'

export default function Home() {
  const [activeTab, setActiveTab] = useState('introduction')
  const [selectedAtom, setSelectedAtom] = useState<string>('Na+')
  
  const handleAtomChange = (atom: string) => {
    setSelectedAtom(atom)
  }
  
  // Atom configuration data
  const atomData = {
    'Na+': { electrons: 10, color: '#9c59ff', electronColor: '#59ff8e' },
    'Cl-': { electrons: 18, color: '#59ff8e', electronColor: '#0df' },
    'Cs+': { electrons: 54, color: '#ff9c59', electronColor: '#59ff8e' },
    'Ca2+': { electrons: 18, color: '#ff5959', electronColor: '#59c2ff' },
    'Ti4+': { electrons: 18, color: '#a0a0a0', electronColor: '#ff5959' },
    'O2-': { electrons: 10, color: '#ff5959', electronColor: '#0df' }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <motion.h1 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ion Grids in Chemistry
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the fascinating world of ionic crystal structures and their three-dimensional arrangements
          </motion.p>
        </header>

        <div className="mb-12">
          <div className="grid w-full grid-cols-5 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'introduction' ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab('introduction')}
            >
              <Atom className="mr-2 h-4 w-4" />
              Introduction
            </button>
            <button 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'structures' ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab('structures')}
            >
              <Grid3X3 className="mr-2 h-4 w-4" />
              Crystal Structures
            </button>
            <button 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'coordination' ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab('coordination')}
            >
              <Beaker className="mr-2 h-4 w-4" />
              Coordination Numbers
            </button>
            <button 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'properties' ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab('properties')}
            >
              <Zap className="mr-2 h-4 w-4" />
              Properties
            </button>
            <button 
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === 'interactive' ? 'bg-background text-foreground shadow-sm' : ''}`}
              onClick={() => setActiveTab('interactive')}
            >
              Interactive Models
            </button>
          </div>
          
          {/* Introduction Tab Content */}
          {activeTab === 'introduction' && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-2">
              <h2 className="text-2xl font-bold mb-4">What are Ion Grids?</h2>
              <p className="mb-4">
                Ionic compounds form extended three-dimensional arrays of alternating cations and anions, 
                known as ion grids or crystal lattices. Unlike molecular compounds, ionic compounds don't 
                exist as discrete molecules but rather as vast networks of ions arranged in regular patterns.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm h-full">
                    <h3 className="text-xl font-semibold mb-3">Key Concepts</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Ionic compounds form crystal lattices to minimize potential energy</li>
                      <li>The arrangement maximizes attractive forces between oppositely charged ions</li>
                      <li>The regular structure gives crystals their characteristic shapes</li>
                      <li>Transition metal ions often give ionic crystals their vibrant colors</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <AtomAnimation 
                    element="Na+" 
                    electrons={10} 
                    color="#9c59ff" 
                    electronColor="#59ff8e" 
                    size="medium" 
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Why Study Ion Grids?">
                  <p className="mb-4">
                    Understanding ion grids helps explain many physical properties of ionic compounds, 
                    including their high melting points, brittleness, and electrical conductivity when 
                    dissolved or melted. These properties have important applications in:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Materials Science:</strong> Developing new materials with specific properties</li>
                    <li><strong>Electronics:</strong> Creating components for electronic devices</li>
                    <li><strong>Pharmaceuticals:</strong> Understanding drug crystal structures</li>
                    <li><strong>Geology:</strong> Studying mineral formation and properties</li>
                  </ul>
                </InteractiveTab>
              </div>
            </div>
          )}
          
          {/* Crystal Structures Tab Content */}
          {activeTab === 'structures' && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-2">
              <h2 className="text-2xl font-bold mb-4">Crystal Structures</h2>
              <p className="mb-6">
                Crystal structures are described by their unit cells - the smallest repeating unit that 
                reflects the full symmetry of the crystal. Different ionic compounds adopt different 
                crystal structures based on the relative sizes of their ions and their charges.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Sodium Chloride</h3>
                  <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mb-4">
                    NaCl
                  </div>
                  <div className="mb-4 h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    NaCl Structure
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Structure:</span> Face-centered cubic (FCC)
                    </div>
                    <div>
                      <span className="font-semibold">Coordination Number:</span> 6:6 (Na+:Cl-)
                    </div>
                    <div>
                      <span className="font-semibold">Properties:</span>
                      <ul className="list-disc pl-5 mt-1">
                        <li>High melting point (801°C)</li>
                        <li>Brittle crystal structure</li>
                        <li>Conducts electricity when dissolved or melted</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Cesium Chloride</h3>
                  <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mb-4">
                    CsCl
                  </div>
                  <div className="mb-4 h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    CsCl Structure
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Structure:</span> Body-centered cubic (BCC)
                    </div>
                    <div>
                      <span className="font-semibold">Coordination Number:</span> 8:8 (Cs+:Cl-)
                    </div>
                    <div>
                      <span className="font-semibold">Properties:</span>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Higher coordination number than NaCl</li>
                        <li>Cs+ ion is considerably larger than Na+</li>
                        <li>Different packing arrangement due to ion size</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Titanium Dioxide</h3>
                  <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block mb-4">
                    TiO₂
                  </div>
                  <div className="mb-4 h-48 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    TiO₂ Structure
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Structure:</span> Tetragonal (Rutile)
                    </div>
                    <div>
                      <span className="font-semibold">Coordination Number:</span> 6:3 (Ti4+:O2-)
                    </div>
                    <div>
                      <span className="font-semibold">Properties:</span>
                      <ul className="list-disc pl-5 mt-1">
                        <li>Used as white pigment in paints</li>
                        <li>High refractive index</li>
                        <li>Coordination number ratio matches formula unit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Unit Cell Types">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Simple Cubic</h4>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        SC
                      </div>
                      <p className="mt-2 text-sm">Atoms at cube corners only</p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Body-Centered Cubic</h4>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        BCC
                      </div>
                      <p className="mt-2 text-sm">Atoms at corners and center</p>
                    </div>
                    
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Face-Centered Cubic</h4>
                      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        FCC
                      </div>
                      <p className="mt-2 text-sm">Atoms at corners and face centers</p>
                    </div>
                  </div>
                </InteractiveTab>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Close Packing Arrangements">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold mb-3">Hexagonal Close Packing (HCP)</h3>
                    <p className="mb-4">
                      HCP has an ABABAB... pattern of layers. Each sphere is surrounded by 12 neighbors.
                      It achieves the maximum packing efficiency of 74%.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 mt-6">Cubic Close Packing (CCP)</h3>
                    <p className="mb-4">
                      CCP has an ABCABCABC... pattern of layers. Each sphere is surrounded by 12 neighbors.
                      It also achieves the maximum packing efficiency of 74%.
                    </p>
                  </div>
                </InteractiveTab>
              </div>
            </div>
          )}
          
          {/* Coordination Numbers Tab Content */}
          {activeTab === 'coordination' && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-2">
              <h2 className="text-2xl font-bold mb-4">Coordination Numbers</h2>
              <p className="mb-6">
                The coordination number is the number of ions that immediately surround an ion of the 
                opposite charge within a crystal lattice. It's determined by the relative sizes of the 
                ions and their charges.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Crystal Structure</th>
                      <th className="py-3 px-4 text-left">Atomic Packing Factor</th>
                      <th className="py-3 px-4 text-left">Coordination Number</th>
                      <th className="py-3 px-4 text-left">Geometry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="py-3 px-4">Simple cubic</td>
                      <td className="py-3 px-4">0.52</td>
                      <td className="py-3 px-4">6</td>
                      <td className="py-3 px-4">Octahedron</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Body-centered cubic (BCC)</td>
                      <td className="py-3 px-4">0.68</td>
                      <td className="py-3 px-4">8</td>
                      <td className="py-3 px-4">Cube</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Face-centered cubic (FCC)</td>
                      <td className="py-3 px-4">0.74</td>
                      <td className="py-3 px-4">12</td>
                      <td className="py-3 px-4">Cuboctahedron</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Hexagonal close-packed (HCP)</td>
                      <td className="py-3 px-4">0.74</td>
                      <td className="py-3 px-4">12</td>
                      <td className="py-3 px-4">Triangular orthobicupola</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InteractiveTab title="Coordination Geometries">
                  <p className="mb-4">
                    The coordination number determines the geometric arrangement of ions around a central ion:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Coordination Number 4:</strong> Tetrahedral geometry (e.g., Diamond cubic)</li>
                    <li><strong>Coordination Number 6:</strong> Octahedral geometry (e.g., NaCl)</li>
                    <li><strong>Coordination Number 8:</strong> Cubic geometry (e.g., CsCl)</li>
                    <li><strong>Coordination Number 12:</strong> Cuboctahedral geometry (e.g., FCC metals)</li>
                  </ul>
                </InteractiveTab>
                
                <div className="flex items-center justify-center">
                  <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    Ion Grid Visualization
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Properties Tab Content */}
          {activeTab === 'properties' && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-2">
              <h2 className="text-2xl font-bold mb-4">Physical Properties</h2>
              <p className="mb-6">
                The crystal structure of ionic compounds determines many of their physical properties.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">High Melting Points</h3>
                  <p>
                    Ionic compounds have high melting points due to the strong electrostatic forces between 
                    ions in the crystal lattice. For example, sodium chloride melts at about 800°C.
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Brittleness</h3>
                  <p>
                    Ionic compounds are hard but brittle. When force is applied, layers of ions shift, 
                    bringing like-charged ions adjacent to each other. The resulting repulsion causes 
                    the crystal to shatter along defined planes.
                  </p>
                </div>
                
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Electrical Conductivity</h3>
                  <p>
                    Solid ionic compounds do not conduct electricity because the ions are fixed in place. 
                    However, when melted or dissolved in water, the ions become mobile and can conduct 
                    an electric current.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Why Ionic Compounds Are Brittle">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="mb-4">
                        When mechanical force is applied to an ionic crystal:
                      </p>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>One layer of ions shifts relative to its neighbor</li>
                        <li>This brings ions of the same charge next to one another</li>
                        <li>The repulsive forces between like-charged ions cause the crystal to shatter</li>
                        <li>The crystal breaks along smooth planes due to the regular arrangement of ions</li>
                      </ol>
                    </div>
                    
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      Brittleness Visualization
                    </div>
                  </div>
                </InteractiveTab>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Electrical Conductivity of Ionic Compounds">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold mb-3">Solid State</h3>
                    <p className="mb-4">
                      In solid form, ions are fixed in place and cannot move to conduct electricity.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-3 mt-6">Solution or Molten State</h3>
                    <p className="mb-4">
                      When dissolved in water or melted, ions become mobile and can move toward electrodes,
                      allowing the flow of electric current.
                    </p>
                  </div>
                </InteractiveTab>
              </div>
            </div>
          )}
          
          {/* Interactive Models Tab Content */}
          {activeTab === 'interactive' && (
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-2">
              <h2 className="text-2xl font-bold mb-4">Interactive Models</h2>
              <p className="mb-6">
                Explore interactive models of different ionic crystal structures and atoms.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mt-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">3D Crystal Viewer</h3>
                  <p className="mb-4">Select a crystal structure to view:</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">NaCl</button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">CsCl</button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">CaF₂</button>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">TiO₂</button>
                  </div>
                  
                  <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <p>3D Crystal Structure Viewer</p>
                      <p className="text-sm text-gray-500 mt-2">
                        (Interactive 3D visualization would appear here)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <InteractiveTab title="Atom Visualizer">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Common Ions in Crystal Structures</h3>
                      <div className="space-y-4">
                        <button 
                          onClick={() => handleAtomChange('Na+')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'Na+' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2 mr-2`}
                        >
                          Na+
                        </button>
                        <button 
                          onClick={() => handleAtomChange('Cl-')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'Cl-' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2 mr-2`}
                        >
                          Cl-
                        </button>
                        <button 
                          onClick={() => handleAtomChange('Cs+')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'Cs+' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2 mr-2`}
                        >
                          Cs+
                        </button>
                        <button 
                          onClick={() => handleAtomChange('Ca2+')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'Ca2+' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2 mr-2`}
                        >
                          Ca2+
                        </button>
                        <button 
                          onClick={() => handleAtomChange('Ti4+')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'Ti4+' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2 mr-2`}
                        >
                          Ti4+
                        </button>
                        <button 
                          onClick={() => handleAtomChange('O2-')}
                          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${selectedAtom === 'O2-' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'} h-10 px-4 py-2`}
                        >
                          O2-
                        </button>
                        
                        <div className="mt-4">
                          <h4 className="font-medium">{selectedAtom}</h4>
                          <p className="text-sm">
                            Electron configuration: {selectedAtom === 'Na+' ? '[Ne]' : 
                                                    selectedAtom === 'Cl-' ? '[Ar]' : 
                                                    selectedAtom === 'Cs+' ? '[Xe]' : 
                                                    selectedAtom === 'Ca2+' ? '[Ar]' : 
                                                    selectedAtom === 'Ti4+' ? '[Ar]' : 
                                                    selectedAtom === 'O2-' ? '[Ne]' : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <AtomAnimation 
                        element={selectedAtom} 
                        electrons={atomData[selectedAtom as keyof typeof atomData]?.electrons || 10} 
                        color={atomData[selectedAtom as keyof typeof atomData]?.color || '#9c59ff'} 
                        electronColor={atomData[selectedAtom as keyof typeof atomData]?.electronColor || '#0df'} 
                        size="medium" 
                      />
                    </div>
                  </div>
                </InteractiveTab>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-gray-500 mt-12">
          <p>© 2025 Ion Grids in Chemistry | Educational Website</p>
        </footer>
      </div>
    </main>
  )
}
