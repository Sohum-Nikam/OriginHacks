'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: '∞' },
    { id: 'mapper', label: 'Origin Mapper', icon: '🧠' },
    { id: 'simulator', label: 'Ripple Simulator', icon: '🌊' },
    { id: 'dashboard', label: 'Civilization', icon: '🌍' },
    { id: 'vault', label: 'Memory Vault', icon: '🔮' },
    { id: 'ai', label: 'Future Echo', icon: '🤖' },
    { id: 'story', label: 'The Story', icon: '📖' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setActiveSection('home')}
              className="text-2xl font-bold gradient-text"
            >
              ORIGIN ∞
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-[#e6c78c] bg-[rgba(230,199,140,0.1)]'
                      : 'text-[#d4c8be] hover:text-[#e6c78c] hover:bg-[rgba(230,199,140,0.05)]'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#d4c8be] hover:text-[#e6c78c] p-2"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden glass-card backdrop-blur-xl mt-2 mx-4 rounded-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-[#e6c78c] bg-[rgba(230,199,140,0.1)]'
                    : 'text-[#d4c8be] hover:text-[#e6c78c] hover:bg-[rgba(230,199,140,0.05)]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}