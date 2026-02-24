'use client';

import { motion } from 'framer-motion';

export function CosmicLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e]">
      <div className="text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#e6c78c] opacity-20"></div>
          <div className="absolute inset-4 rounded-full border-2 border-[#d4c8be] opacity-40"></div>
          <div className="absolute inset-8 rounded-full border-2 border-[#fffff0]"></div>
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#e6c78c] rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateX(40px)`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
        
        <motion.h1 
          className="text-4xl font-bold text-[#fffff0] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          ORIGIN ∞
        </motion.h1>
        
        <motion.p 
          className="text-xl text-[#d4c8be] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          The Human Continuum Engine
        </motion.p>
        
        <motion.p 
          className="text-lg text-[#a89f91]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          You were born...
        </motion.p>
        
        <motion.div
          className="flex justify-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-[#e6c78c] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}