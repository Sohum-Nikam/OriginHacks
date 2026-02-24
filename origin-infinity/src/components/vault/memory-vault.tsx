'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface MemoryOrb {
  id: string;
  title: string;
  type: string;
  position: [number, number, number];
  scale: number;
  color: string;
}

function FloatingOrbs({ 
  memories, 
  onOrbClick 
}: { 
  memories: any[]; 
  onOrbClick: (memory: any) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [orbs, setOrbs] = useState<MemoryOrb[]>([]);

  useEffect(() => {
    const newOrbs: MemoryOrb[] = memories.map((memory, index) => {
      const angle = (index / memories.length) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 6;
      
      let color = '#d4c09a';
      if (memory.type === 'story') color = '#e6d2a8';
      if (memory.type === 'voice') color = '#f9f3e6';
      if (memory.type === 'values') color = '#fcf9f2';

      return {
        id: memory.id,
        title: memory.title,
        type: memory.type,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        scale: 0.8 + Math.random() * 0.7,
        color
      };
    });
    
    setOrbs(newOrbs);
  }, [memories]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'story': return '📖';
      case 'voice': return '🎤';
      case 'values': return '💎';
      default: return '💭';
    }
  };

  return (
    <group ref={groupRef}>
      {orbs.map((orb) => (
        <group key={orb.id} position={orb.position}>
          {/* Orb */}
          <mesh
            scale={orb.scale}
            onClick={() => {
              const memory = memories.find(m => m.id === orb.id);
              if (memory) onOrbClick(memory);
            }}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color={orb.color}
              emissive={new THREE.Color(orb.color).multiplyScalar(0.3)}
              emissiveIntensity={0.5}
              transparent
              opacity={0.85}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
          
          {/* Glow effect */}
          <mesh scale={orb.scale * 1.3}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color={orb.color}
              emissive={new THREE.Color(orb.color).multiplyScalar(0.5)}
              emissiveIntensity={0.3}
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Title */}
          <Text
            position={[0, orb.scale + 0.5, 0]}
            fontSize={0.3}
            color="#5d5444"
            anchorX="center"
            anchorY="middle"
            maxWidth={4}
          >
            {orb.title}
          </Text>
          
          {/* Type indicator */}
          <Text
            position={[0, -orb.scale - 0.5, 0]}
            fontSize={0.4}
            color="#7a7162"
            anchorX="center"
            anchorY="middle"
          >
            {getTypeIcon(orb.type)}
          </Text>
        </group>
      ))}
    </group>
  );
}

function Scene({ 
  memories, 
  onOrbClick 
}: { 
  memories: any[]; 
  onOrbClick: (memory: any) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.5} color="#fcf9f2" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#e6d2a8" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4c09a" />
      <FloatingOrbs memories={memories} onOrbClick={onOrbClick} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

export function MemoryVault() {
  const [memories, setMemories] = useState<any[]>([
    { id: '1', title: 'Childhood Wonder', type: 'story', content: 'First moment of pure curiosity' },
    { id: '2', title: 'Voice of Courage', type: 'voice', content: 'Recording of overcoming fear' },
    { id: '3', title: 'Core Values', type: 'values', content: 'Integrity and compassion' },
    { id: '4', title: 'Creative Breakthrough', type: 'story', content: 'Moment of artistic inspiration' },
    { id: '5', title: 'Wisdom Shared', type: 'voice', content: 'Advice to future self' },
  ]);
  
  const [selectedMemory, setSelectedMemory] = useState<any>(null);
  const [newMemory, setNewMemory] = useState({ title: '', content: '', type: 'story' });

  const handleAddMemory = () => {
    if (!newMemory.title.trim()) return;
    
    const memory = {
      id: Date.now().toString(),
      ...newMemory
    };
    
    setMemories(prev => [...prev, memory]);
    setNewMemory({ title: '', content: '', type: 'story' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Digital Memory Vault</h1>
          <p className="text-xl text-[#7a7162]">
            Preserve your stories, voices, and values in floating orbs of light
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Add Memory Panel */}
          <div className="glass-panel p-6 lg:col-span-1">
            <h2 className="text-2xl font-bold text-[#5d5444] mb-6">Add New Memory</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#5d5444] font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 glass-panel rounded-lg border border-[#e8e1d4] focus:border-[#d4c09a] focus:outline-none text-[#5d5444]"
                  placeholder="Memory title..."
                />
              </div>
              
              <div>
                <label className="block text-[#5d5444] font-medium mb-2">Type</label>
                <select
                  value={newMemory.type}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full p-3 glass-panel rounded-lg border border-[#e8e1d4] focus:border-[#d4c09a] focus:outline-none text-[#5d5444]"
                >
                  <option value="story">📖 Story</option>
                  <option value="voice">🎤 Voice Recording</option>
                  <option value="values">💎 Core Values</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[#5d5444] font-medium mb-2">Content</label>
                <textarea
                  value={newMemory.content}
                  onChange={(e) => setNewMemory(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 glass-panel rounded-lg border border-[#e8e1d4] focus:border-[#d4c09a] focus:outline-none min-h-[120px] text-[#5d5444]"
                  placeholder="Describe your memory..."
                />
              </div>
              
              <button
                onClick={handleAddMemory}
                disabled={!newMemory.title.trim()}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  !newMemory.title.trim()
                    ? 'bg-[#e8e1d4] text-[#7a7162] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] text-[#5d5444] hover:scale-105'
                }`}
              >
                Add to Vault
              </button>
            </div>
          </div>

          {/* 3D Memory Space */}
          <div className="glass-panel p-4 lg:col-span-2 h-96 lg:h-[500px] relative overflow-hidden rounded-2xl">
            <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-2 rounded-lg">
              <p className="text-sm text-[#5d5444] font-medium">Click orbs to explore memories</p>
            </div>
            <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
              <Scene memories={memories} onOrbClick={setSelectedMemory} />
            </Canvas>
          </div>
        </div>

        {/* Selected Memory Detail */}
        {selectedMemory && (
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#5d5444]">{selectedMemory.title}</h2>
              <button
                onClick={() => setSelectedMemory(null)}
                className="text-[#7a7162] hover:text-[#5d5444]"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">
                {selectedMemory.type === 'story' ? '📖' : 
                 selectedMemory.type === 'voice' ? '🎤' : '💎'}
              </span>
              <span className="text-[#7a7162] capitalize">{selectedMemory.type}</span>
            </div>
            <p className="text-[#5d5444] leading-relaxed">{selectedMemory.content}</p>
          </motion.div>
        )}

        {/* Vault Stats */}
        <motion.div
          className="glass-panel p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-[#5d5444] mb-4">Vault Statistics</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#d4c09a] mb-2">{memories.length}</div>
              <div className="text-[#7a7162]">Total Memories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e6d2a8] mb-2">
                {memories.filter(m => m.type === 'story').length}
              </div>
              <div className="text-[#7a7162]">Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#f9f3e6] mb-2">
                {memories.filter(m => m.type === 'values').length}
              </div>
              <div className="text-[#7a7162]">Values</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}