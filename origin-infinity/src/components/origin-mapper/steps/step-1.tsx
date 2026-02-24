'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

const coreValues = [
  "Compassion", "Integrity", "Growth", "Connection", 
  "Creativity", "Service", "Authenticity", "Wisdom"
];

const coreFears = [
  "Rejection", "Failure", "Isolation", "Insignificance",
  "Loss of Control", "Vulnerability", "Judgment", "Change"
];

export function OriginStep1() {
  const { register, watch, setValue } = useFormContext();
  const selectedValues = watch('coreValues') || [];
  const selectedFears = watch('coreFears') || [];

  const toggleValue = (value: string, field: 'coreValues' | 'coreFears') => {
    const current = watch(field) || [];
    if (current.includes(value)) {
      setValue(field, current.filter((v: string) => v !== value));
    } else {
      setValue(field, [...current, value]);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#0c0c0c] mb-2">Core Identity</h2>
        <p className="text-[#a89f91]">
          Explore your fundamental values and deepest fears that shape who you are
        </p>
      </div>

      {/* Core Values */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-4">
          What are your core values? (Select 2-4)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {coreValues.map((value) => (
            <motion.button
              key={value}
              type="button"
              onClick={() => toggleValue(value, 'coreValues')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-center ${
                selectedValues.includes(value)
                  ? 'border-[#e6c78c] bg-[#e6c78c] text-[#0c0c0c]'
                  : 'border-[#d4c8be] bg-white text-[#0c0c0c] hover:border-[#e6c78c]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {value}
            </motion.button>
          ))}
        </div>
        {selectedValues.length < 1 && (
          <p className="text-red-500 text-sm mt-2">Please select at least one value</p>
        )}
      </div>

      {/* Life Purpose */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-2">
          What is your life purpose?
        </label>
        <textarea
          {...register('lifePurpose')}
          placeholder="Describe your sense of life purpose and direction..."
          className="w-full p-4 glass-card rounded-lg border border-[#d4c8be] focus:border-[#e6c78c] focus:outline-none min-h-[120px] text-[#0c0c0c]"
        />
      </div>

      {/* Core Fears */}
      <div>
        <label className="block text-lg font-medium text-[#0c0c0c] mb-4">
          What are your core fears? (Select 1-3)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {coreFears.map((fear) => (
            <motion.button
              key={fear}
              type="button"
              onClick={() => toggleValue(fear, 'coreFears')}
              className={`p-3 rounded-lg border-2 transition-all duration-300 text-center text-sm ${
                selectedFears.includes(fear)
                  ? 'border-red-300 bg-red-50 text-red-800'
                  : 'border-[#d4c8be] bg-white text-[#0c0c0c] hover:border-red-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {fear}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}