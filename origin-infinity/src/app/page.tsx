'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicLoader } from '@/components/ui/cosmic-loader';
import { Navigation } from '@/components/layout/navigation';
import { OriginMapper } from '@/components/origin-mapper/origin-mapper';
import { RippleSimulator } from '@/components/simulations/ripple-simulator';
import { CivilizationDashboard } from '@/components/dashboard/civilization-dashboard';
import { FutureSelfChat } from '@/components/ai/future-self-chat';
import { MemoryVault } from '@/components/vault/memory-vault';
import { ScrollTriggeredStory } from '@/components/storytelling/scroll-triggered-story';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (section: string) => {
    const sections = ['home', 'mapper', 'simulator', 'dashboard', 'ai', 'story'];
    const currentIndex = sections.indexOf(activeSection);
    const targetIndex = sections.indexOf(section);
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'mapper':
        return <OriginMapper />;
      case 'simulator':
        return <RippleSimulator />;
      case 'dashboard':
        return <CivilizationDashboard />;
      case 'vault':
        return <MemoryVault />;
      case 'ai':
        return <FutureSelfChat />;
      case 'story':
        return <ScrollTriggeredStory />;
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold gradient-text mb-8 cinematic-fade-in"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                ORIGIN ∞
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-[#7a7162] mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                The Human Continuum Engine
              </motion.p>
              <motion.p 
                className="text-lg text-[#a89f91] mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                Explore your psychological origins and simulate multi-generational ripple effects across human civilization
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <button 
                  onClick={() => navigateTo('mapper')}
                  className="glass-panel px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300"
                >
                  Begin Your Journey
                </button>
                <button 
                  onClick={() => navigateTo('story')}
                  className="px-8 py-4 text-lg font-medium text-[#7a7162] hover:text-[#d4c09a] transition-colors duration-300"
                >
                  Discover the Story
                </button>
              </motion.div>
            </div>
          </div>
        );
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      filter: 'blur(20px)'
    }),
    animate: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      filter: 'blur(20px)'
    })
  };

  if (isLoading) {
    return <CosmicLoader />;
  }

  return (
    <div className="min-h-screen">
      <Navigation activeSection={activeSection} setActiveSection={navigateTo} />
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activeSection}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}