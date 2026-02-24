'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

const influences = [
  "Family", "Education", "Culture", "Technology",
  "Nature", "Spirituality", "Media", "Community"
];

export function OriginStep2() {
  const { register, watch, setValue } = useFormContext();
  const selectedInfluences = watch('primaryInfluences') || [];

  const toggleInfluence = (influence: string) => {
    const current = watch('primaryInfluences') || [];
    if (current.includes(influence)) {
      setValue('primaryInfluences', current.filter((i: string) => i !== influence));
    } else {
      setValue('primaryInfluences', [...current, influence]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0c0c0c] mb-2">Relationships & Environment</h2>
        <p className="text-[#a89f91]">
          Examine the forces that have shaped your development and current context
        </p>
      </div>

      {/* Primary Influences */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-4">
          What are your primary influences? (Select 2-4)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {influences.map((influence) => (
            <motion.button
              key={influence}
              type="button"
              onClick={() => toggleInfluence(influence)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                selectedInfluences.includes(influence)
                  ? 'border-[#e6c78c] bg-[#e6c78c] text-[#0c0c0c]'
                  : 'border-[#d4c8be] bg-white text-[#0c0c0c] hover:border-[#e6c78c]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {influence}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Formative Experiences */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          Describe key formative experiences
        </label>
        <textarea
          {...register('formativeExperiences')}
          placeholder="Share pivotal moments, relationships, or experiences that significantly shaped who you are today..."
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[140px] text-[#0c0c0c]"
        />
      </div>

      {/* Current Environment */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          Describe your current environment
        </label>
        <textarea
          {...register('currentEnvironment')}
          placeholder="Describe your current living situation, work environment, social circles, and daily context..."
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[120px] text-[#0c0c0c]"
        />
      </div>
    </div>
  );
}