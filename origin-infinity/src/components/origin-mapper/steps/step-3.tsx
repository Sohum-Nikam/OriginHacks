'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

export function OriginStep3() {
  const { register } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0c0c0c] mb-2">Future Vision</h2>
        <p className="text-[#a89f91]">
          Envision your growth trajectory and the ripples you wish to create
        </p>
      </div>

      {/* Desired Growth */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          What growth do you desire?
        </label>
        <textarea
          {...register('desiredGrowth')}
          placeholder="Describe the personal growth, skills, or qualities you most want to develop..."
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[120px] text-[#0c0c0c]"
        />
      </div>

      {/* Legacy Vision */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          What legacy do you envision?
        </label>
        <textarea
          {...register('legacyVision')}
          placeholder="How do you want to be remembered? What impact do you hope to leave on others and the world?"
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[120px] text-[#0c0c0c]"
        />
      </div>

      {/* Ripple Impact */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          What ripple effects do you want to create?
        </label>
        <textarea
          {...register('rippleImpact')}
          placeholder="Describe how your growth and actions might influence others, communities, or future generations..."
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[120px] text-[#0c0c0c]"
        />
      </div>

      {/* Visualization Prompt */}
      <motion.div 
        className="glass-card p-6 rounded-xl border border-[#e6c78c]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-[#0c0c0c] mb-3">Reflection Moment</h3>
        <p className="text-[#a89f91]">
          Take a moment to visualize how your answers connect your past experiences 
          with your future potential. Consider how small changes in your approach 
          might create waves of positive impact across your relationships and community.
        </p>
      </motion.div>
    </div>
  );
}