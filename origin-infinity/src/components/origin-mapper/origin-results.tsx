'use client';

import { motion } from 'framer-motion';
import { OriginFormData } from './origin-mapper';

interface OriginResultsProps {
  results: OriginFormData & { 
    rippleScore: number; 
    empathyIndex: number; 
    innovationPotential: number 
  };
  onRestart: () => void;
}

export function OriginResults({ results, onRestart }: OriginResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Exceptional';
    if (score >= 60) return 'Strong';
    return 'Developing';
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Your Origin Map</h1>
          <p className="text-xl text-[#d4c8be]">
            Understanding your psychological foundations and ripple potential
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Core Metrics */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-[#0c0c0c] mb-6">Core Metrics</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#0c0c0c] font-medium">Ripple Score</span>
                  <span className={`text-2xl font-bold ${getScoreColor(results.rippleScore)}`}>
                    {results.rippleScore}%
                  </span>
                </div>
                <div className="w-full bg-[#d4c8be] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getScoreColor(results.rippleScore).replace('text-', 'bg-').replace('-600', '-500')}`}
                    style={{ width: `${results.rippleScore}%` }}
                  />
                </div>
                <p className="text-sm text-[#a89f91] mt-2">{getScoreLabel(results.rippleScore)} potential for creating positive change</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#0c0c0c] font-medium">Empathy Index</span>
                  <span className={`text-2xl font-bold ${getScoreColor(results.empathyIndex)}`}>
                    {results.empathyIndex}%
                  </span>
                </div>
                <div className="w-full bg-[#d4c8be] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getScoreColor(results.empathyIndex).replace('text-', 'bg-').replace('-600', '-500')}`}
                    style={{ width: `${results.empathyIndex}%` }}
                  />
                </div>
                <p className="text-sm text-[#a89f91] mt-2">Capacity for understanding and connecting with others</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#0c0c0c] font-medium">Innovation Potential</span>
                  <span className={`text-2xl font-bold ${getScoreColor(results.innovationPotential)}`}>
                    {results.innovationPotential}%
                  </span>
                </div>
                <div className="w-full bg-[#d4c8be] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getScoreColor(results.innovationPotential).replace('text-', 'bg-').replace('-600', '-500')}`}
                    style={{ width: `${results.innovationPotential}%` }}
                  />
                </div>
                <p className="text-sm text-[#a89f91] mt-2">Creative problem-solving and forward-thinking capacity</p>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-[#0c0c0c] mb-6">Key Insights</h2>
            <div className="space-y-6">
              <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
                <h3 className="font-semibold text-[#0c0c0c] mb-2">Core Values Alignment</h3>
                <p className="text-[#a89f91] text-sm">
                  Your values of <span className="text-[#0c0c0c] font-medium">{results.coreValues.join(', ')}</span> suggest 
                  strong alignment with {results.coreValues.length > 2 ? 'multiple' : 'a'} foundational principles.
                </p>
              </div>

              <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
                <h3 className="font-semibold text-[#0c0c0c] mb-2">Growth Opportunities</h3>
                <p className="text-[#a89f91] text-sm">
                  Your responses indicate potential for growth in areas related to 
                  {results.coreFears.length > 0 ? ` overcoming ${results.coreFears[0].toLowerCase()}` : ' personal development'}.
                </p>
              </div>

              <div className="p-4 bg-[#fdf6e3] rounded-lg border border-[#e6c78c]">
                <h3 className="font-semibold text-[#0c0c0c] mb-2">Ripple Potential</h3>
                <p className="text-[#a89f91] text-sm">
                  Based on your vision and values, you have strong potential to create meaningful 
                  positive impact in your community and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={onRestart}
            className="px-8 py-4 glass-card text-lg font-medium hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Map Again
          </motion.button>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-[#e6c78c] text-[#0c0c0c] rounded-lg text-lg font-medium hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Ripple Simulator
          </motion.button>
        </div>
      </div>
    </div>
  );
}