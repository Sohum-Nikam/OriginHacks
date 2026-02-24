'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface Particle {
  position: [number, number, number];
  velocity: [number, number, number];
  size: number;
  color: string;
  id: number;
}

interface RippleEvent {
  position: [number, number, number];
  timestamp: number;
  intensity: number;
}

function RippleParticles({ 
  events, 
  onParticleClick 
}: { 
  events: RippleEvent[]; 
  onParticleClick: (position: [number, number, number]) => void;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    if (events.length > 0) {
      const newParticles: Particle[] = [];
      const particleCount = 300;
      
      for (let i = 0; i < particleCount; i++) {
        const baseEvent = events[events.length - 1];
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = Math.random() * baseEvent.intensity * 3 + 1;
        const height = (Math.random() - 0.5) * baseEvent.intensity;
        
        newParticles.push({
          id: i,
          position: [
            baseEvent.position[0] + Math.cos(angle) * radius,
            baseEvent.position[1] + height,
            baseEvent.position[2] + Math.sin(angle) * radius
          ],
          velocity: [
            (Math.random() - 0.5) * 0.03,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.03
          ],
          size: Math.random() * 0.4 + 0.1,
          color: `hsl(${Math.random() * 40 + 20}, 70%, ${60 + Math.random() * 20}%)`
        });
      }
      
      setParticles(newParticles);
    }
  }, [events]);

  useFrame((state) => {
    if (meshRef.current && particles.length > 0) {
      const time = state.clock.getElapsedTime();
      
      particles.forEach((particle, i) => {
        const matrix = new THREE.Matrix4();
        const pos = new THREE.Vector3(...particle.position);
        
        // Complex wave pattern based on multiple events
        events.forEach((event, eventIndex) => {
          const timeSinceEvent = time - event.timestamp;
          const waveDistance = pos.distanceTo(new THREE.Vector3(...event.position));
          const wavePhase = timeSinceEvent * 2 - waveDistance * 0.5;
          const waveIntensity = Math.sin(wavePhase) * Math.exp(-timeSinceEvent * 0.5) * event.intensity * 0.3;
          
          pos.x += Math.cos(wavePhase) * waveIntensity * 0.1;
          pos.y += Math.sin(wavePhase * 1.5) * waveIntensity * 0.05;
          pos.z += Math.sin(wavePhase * 0.8) * waveIntensity * 0.1;
        });
        
        // Add some organic movement
        pos.y += Math.sin(time * 2 + i * 0.1) * 0.1;
        
        matrix.setPosition(pos);
        meshRef.current!.setMatrixAt(i, matrix);
      });
      
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, particles.length]}
      onClick={(e) => {
        const point = e.point.toArray() as [number, number, number];
        onParticleClick(point);
      }}
    >
      <sphereGeometry args={[0.15, 12, 12]} />
      <meshStandardMaterial 
        color="#d4c09a" 
        emissive="#e6d2a8"
        emissiveIntensity={0.6}
        transparent
        opacity={0.85}
        roughness={0.2}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

function Scene({ 
  events, 
  onParticleClick 
}: { 
  events: RippleEvent[]; 
  onParticleClick: (position: [number, number, number]) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.4} color="#fcf9f2" />
      <pointLight position={[15, 15, 15]} intensity={1.5} color="#e6d2a8" />
      <pointLight position={[-15, -15, -15]} intensity={0.8} color="#d4c09a" />
      <Stars 
        radius={150} 
        depth={100} 
        count={8000} 
        factor={6} 
        saturation={0.1} 
        fade 
        speed={0.5} 
      />
      <RippleParticles events={events} onParticleClick={onParticleClick} />
      
      {/* Event markers */}
      {events.map((event, index) => (
        <group key={index} position={event.position}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial 
              color="#e6d2a8" 
              emissive="#d4c09a"
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.5}
            color="#5d5444"
            anchorX="center"
            anchorY="middle"
          >
            Event {index + 1}
          </Text>
        </group>
      ))}
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
    </>
  );
}

export function RippleSimulator() {
  const [events, setEvents] = useState<RippleEvent[]>([]);
  const [intensity, setIntensity] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCanvasClick = (point: [number, number, number]) => {
    if (isAnimating) return;
    
    const newEvent: RippleEvent = {
      position: point,
      timestamp: Date.now() / 1000,
      intensity: intensity / 20
    };
    
    setEvents(prev => [...prev, newEvent]);
  };

  const handleReset = () => {
    setEvents([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Interactive Ripple Simulator</h1>
          <p className="text-xl text-[#7a7162]">
            Click anywhere in 3D space to create ripple events and witness the interconnected waves
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Controls Panel */}
          <div className="glass-panel p-6 lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#5d5444] mb-6">Simulation Controls</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#5d5444] font-medium mb-2">
                  Wave Intensity: {intensity}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#e8e1d4] rounded-lg appearance-none cursor-pointer slider"
                />
                <p className="text-sm text-[#7a7162] mt-1">
                  Controls the strength of each ripple event
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-[#fdfdfd] to-[#fcf9f2] rounded-xl border border-[#e8e1d4]">
                <h3 className="font-semibold text-[#5d5444] mb-3">📊 Current Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#7a7162]">Active Events:</span>
                    <span className="text-[#5d5444] font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7162]">Total Interactions:</span>
                    <span className="text-[#5d5444] font-medium">{events.length * 50}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7a7162]">Complexity Score:</span>
                    <span className="text-[#5d5444] font-medium">{Math.min(100, events.length * 15)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleReset}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] text-[#5d5444] rounded-lg font-medium hover:scale-105 transition-all duration-300"
                >
                  Clear All Events
                </button>
                <button
                  onClick={() => setIsAnimating(!isAnimating)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    isAnimating
                      ? 'bg-[#e8e1d4] text-[#7a7162] cursor-not-allowed'
                      : 'bg-[#fcf9f2] text-[#5d5444] border border-[#e8e1d4] hover:scale-105'
                  }`}
                >
                  {isAnimating ? 'Animation Active' : 'Enable Animation'}
                </button>
              </div>
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="glass-panel p-4 lg:col-span-2 h-96 lg:h-[500px] relative overflow-hidden rounded-2xl">
            <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-2 rounded-lg">
              <p className="text-sm text-[#5d5444] font-medium">Click anywhere to create ripples</p>
            </div>
            <Canvas 
              camera={{ position: [0, 8, 15], fov: 50 }}
              onClick={(e) => handleCanvasClick(e.point.toArray() as [number, number, number])}
            >
              <Scene events={events} onParticleClick={handleCanvasClick} />
            </Canvas>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-[#5d5444] mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖱️</span>
              </div>
              <h3 className="font-semibold text-[#5d5444] mb-2">Click to Create</h3>
              <p className="text-[#7a7162] text-sm">
                Each click generates a new ripple event at that location in 3D space
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e6d2a8] to-[#f9f3e6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌀</span>
              </div>
              <h3 className="font-semibold text-[#5d5444] mb-2">Watch the Waves</h3>
              <p className="text-[#7a7162] text-sm">
                Observe how waves interact, interfere, and create complex patterns
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f9f3e6] to-[#fcf9f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="font-semibold text-[#5d5444] mb-2">Emergent Patterns</h3>
              <p className="text-[#7a7162] text-sm">
                Simple interactions create beautiful, unpredictable emergent behaviors
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}