'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: number;
}

export function CinematicOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to ORIGIN ∞",
      description: "Begin your journey through the human continuum",
      icon: "∞",
      duration: 3000
    },
    {
      id: 2,
      title: "Discover Your Origin",
      description: "Map your psychological foundations and core values",
      icon: "🧠",
      duration: 2500
    },
    {
      id: 3,
      title: "Visualize Your Ripples",
      description: "See how your choices create waves across time",
      icon: "🌊",
      duration: 2500
    },
    {
      id: 4,
      title: "Preserve Your Memories",
      description: "Store stories, voices, and values in digital orbs",
      icon: "🔮",
      duration: 2500
    },
    {
      id: 5,
      title: "Converse with Tomorrow",
      description: "Connect with your future self through memory integration",
      icon: "🤖",
      duration: 3000
    }
  ];

  // Elastic progress animation
  const progressSpring = useSpring({
    value: progress,
    config: { tension: 300, friction: 20, mass: 0.8 }
  });

  // Timeline slider animation
  const sliderSpring = useSpring({
    x: (currentStep / (steps.length - 1)) * 100,
    config: { tension: 200, friction: 25 }
  });

  useEffect(() => {
    if (currentStep >= steps.length) {
      setIsComplete(true);
      return;
    }

    const step = steps[currentStep];
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setProgress(((currentStep + 1) / steps.length) * 100);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, steps]);

  const handleSkip = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfdfd] via-[#fcf9f2] to-[#f9f3e6]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full flex items-center justify-center mx-auto mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <span className="text-4xl">✨</span>
          </motion.div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Your Journey Begins</h1>
          <p className="text-xl text-[#7a7162] mb-8">Ready to explore the human continuum?</p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] text-[#5d5444] rounded-full font-medium hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter ORIGIN ∞
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfdfd] via-[#fcf9f2] to-[#f9f3e6] relative overflow-hidden">
      {/* Ambient Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#d4c09a] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="text-center max-w-2xl"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.3 }
            }}
          >
            {/* Icon Animation */}
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <span className="text-6xl">{currentStepData.icon}</span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-5xl font-bold gradient-text mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentStepData.title}
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-xl text-[#7a7162] mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {currentStepData.description}
            </motion.p>

            {/* Progress Text */}
            <motion.p 
              className="text-lg text-[#a89f91] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Step {currentStep + 1} of {steps.length}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Timeline Slider */}
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-8">
          <div className="relative">
            {/* Progress Track */}
            <div className="h-2 bg-[#e8e1d4] rounded-full overflow-hidden">
              <animated.div
                className="h-full bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] rounded-full"
                style={{
                  width: progressSpring.value.to(val => `${val}%`)
                }}
              />
            </div>

            {/* Step Markers */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`w-4 h-4 rounded-full border-2 ${
                    index <= currentStep 
                      ? 'bg-[#d4c09a] border-[#d4c09a]' 
                      : 'bg-transparent border-[#e8e1d4]'
                  }`}
                  animate={{
                    scale: index === currentStep ? [1, 1.3, 1] : 1
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: index === currentStep ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>

            {/* Slider Handle */}
            <animated.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#5d5444] rounded-full shadow-lg"
              style={{
                left: sliderSpring.x.to(val => `${val}%`)
              }}
            />
          </div>
        </div>

        {/* Skip Button */}
        <motion.button
          className="fixed top-8 right-8 px-4 py-2 bg-[#fdfdfd] text-[#7a7162] rounded-full border border-[#e8e1d4] hover:border-[#d4c09a] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSkip}
        >
          Skip Introduction
        </motion.button>
      </div>
    </div>
  );
}