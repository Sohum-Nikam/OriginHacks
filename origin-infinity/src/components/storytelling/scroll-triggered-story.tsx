'use client';

import { useEffect, useRef } from 'react';

export function ScrollTriggeredStory() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <div 
          ref={addToRefs}
          className="scroll-fade-in mb-20 glass-panel p-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-6">The Journey Begins</h2>
          <p className="text-lg text-[#5d5444] leading-relaxed">
            Every choice creates ripples that extend far beyond what we can perceive. 
            In this space, we explore the profound interconnectedness of human experience 
            and the invisible threads that bind our individual journeys to the collective story.
          </p>
        </div>

        {/* Origin Discovery */}
        <div 
          ref={addToRefs}
          className="scroll-fade-in mb-20 glass-panel p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#5d5444] mb-4">Discovering Your Origin</h3>
              <p className="text-[#7a7162] leading-relaxed">
                Your psychological foundation shapes every ripple you create. Through deep self-reflection, 
                we map the invisible patterns that drive your decisions and reveal the profound wisdom 
                encoded in your core being.
              </p>
            </div>
            <div className="flex-1 h-64 glass-panel rounded-2xl flex items-center justify-center light-sweep">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <p className="text-[#5d5444] font-medium">Psychological Mapping</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ripple Visualization */}
        <div 
          ref={addToRefs}
          className="scroll-fade-in mb-20 glass-panel p-12"
        >
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#5d5444] mb-4">Visualizing the Ripples</h3>
              <p className="text-[#7a7162] leading-relaxed">
                Watch as your choices manifest in three-dimensional space. Each decision sends waves 
                propagating through time, influencing countless lives in ways both seen and unseen. 
                The beauty lies in the complexity of these interconnected patterns.
              </p>
            </div>
            <div className="flex-1 h-64 glass-panel rounded-2xl flex items-center justify-center ripple-wave-advanced">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#e6d2a8] to-[#f9f3e6] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌊</span>
                </div>
                <p className="text-[#5d5444] font-medium">3D Ripple Simulation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collective Impact */}
        <div 
          ref={addToRefs}
          className="scroll-fade-in mb-20 glass-panel p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#5d5444] mb-4">The Collective Symphony</h3>
              <p className="text-[#7a7162] leading-relaxed">
                Individual ripples become part of humanity's grand symphony. Your personal growth 
                contributes to civilization's evolution, just as the health of the whole supports 
                individual flourishing. We are both the composer and the composition.
              </p>
            </div>
            <div className="flex-1 h-64 glass-panel rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f9f3e6] to-[#fcf9f2] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <p className="text-[#5d5444] font-medium">Global Dynamics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Self Integration */}
        <div 
          ref={addToRefs}
          className="scroll-fade-in glass-panel p-12"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#5d5444] mb-6">Conversing with Tomorrow</h3>
            <p className="text-[#7a7162] leading-relaxed max-w-2xl mx-auto mb-8">
              Your future self holds wisdom from the journey yet to unfold. Through this dialogue, 
              gain clarity on the choices that create the most meaningful ripples, and discover 
              the profound beauty of your evolving consciousness across time.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full flex items-center justify-center animate-pulse-gentle">
                <span className="text-xl">🤖</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#e6d2a8] to-[#f9f3e6] rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '0.5s' }}>
                <span className="text-xl">🔮</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#f9f3e6] to-[#fcf9f2] rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '1s' }}>
                <span className="text-xl">🌟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}