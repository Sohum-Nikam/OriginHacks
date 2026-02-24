'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { OriginStep1 } from './steps/step-1';
import { OriginStep2 } from './steps/step-2';
import { OriginStep3 } from './steps/step-3';
import { OriginResults } from './origin-results';

const formSchema = z.object({
  // Step 1: Core Identity
  coreValues: z.array(z.string()).min(1, "Select at least one core value"),
  lifePurpose: z.string().min(10, "Please describe your life purpose"),
  coreFears: z.array(z.string()).min(1, "Select at least one core fear"),
  
  // Step 2: Relationships & Environment
  primaryInfluences: z.array(z.string()).min(1, "Select at least one influence"),
  formativeExperiences: z.string().min(20, "Please describe formative experiences"),
  currentEnvironment: z.string().min(10, "Describe your current environment"),
  
  // Step 3: Future Vision
  desiredGrowth: z.string().min(15, "Describe your desired growth"),
  legacyVision: z.string().min(15, "Describe your legacy vision"),
  rippleImpact: z.string().min(10, "Describe desired ripple impact"),
});

export type OriginFormData = z.infer<typeof formSchema>;

export function OriginMapper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<OriginFormData & { 
    rippleScore: number; 
    empathyIndex: number; 
    innovationPotential: number 
  } | null>(null);

  const methods = useForm<OriginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coreValues: [],
      coreFears: [],
      primaryInfluences: [],
    }
  });

  const steps = [
    { id: 1, title: "Core Identity", component: OriginStep1 },
    { id: 2, title: "Relationships & Environment", component: OriginStep2 },
    { id: 3, title: "Future Vision", component: OriginStep3 },
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const StepComponent = currentStepData?.component;

  const handleNext = async () => {
    if (currentStep < steps.length) {
      const isValid = await methods.trigger();
      if (isValid) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      const data = methods.getValues();
      // Simulate processing
      setTimeout(() => {
        setResults({
          ...data,
          rippleScore: Math.floor(Math.random() * 40) + 60,
          empathyIndex: Math.floor(Math.random() * 30) + 70,
          innovationPotential: Math.floor(Math.random() * 25) + 75,
        });
        setIsComplete(true);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isComplete && results) {
    return <OriginResults results={results} onRestart={() => {
      setIsComplete(false);
      setCurrentStep(1);
      setResults(null);
      methods.reset();
    }} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Origin Mapper</h1>
          <p className="text-xl text-[#d4c8be] mb-8">
            Map your psychological origins and discover your ripple potential
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep >= step.id 
                      ? 'bg-[#e6c78c] text-[#0c0c0c]' 
                      : 'bg-[#d4c8be] text-[#0c0c0c]'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <span className="text-xs mt-2 text-[#a89f91]">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-[#d4c8be] rounded-full h-2">
              <motion.div 
                className="bg-[#e6c78c] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-center text-[#a89f91] mt-4">
              Step {currentStep} of {steps.length}
            </p>
          </div>
        </motion.div>

        {/* Form Content */}
        <FormProvider {...methods}>
          <motion.div
            key={currentStep}
            className="glass-card p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {StepComponent && <StepComponent />}
          </motion.div>
        </FormProvider>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              currentStep === 1
                ? 'bg-[#d4c8be] text-[#a89f91] cursor-not-allowed'
                : 'bg-[#d4c8be] text-[#0c0c0c] hover:bg-[#e6c78c] hover:scale-105'
            }`}
          >
            ← Back
          </button>
          
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#e6c78c] text-[#0c0c0c] rounded-lg font-medium hover:scale-105 transition-all duration-300 flex items-center"
          >
            {currentStep === steps.length ? 'Complete Mapping' : 'Next Step'}
            {currentStep < steps.length && ' →'}
          </button>
        </div>
      </div>
    </div>
  );
}