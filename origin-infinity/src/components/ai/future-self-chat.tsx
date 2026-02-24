'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { prisma } from '@/lib/db';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: string;
}

interface Memory {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: Date;
}

export function FutureSelfChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your Future Echo, speaking from 20 years ahead. I've integrated all your memories, values, and psychological insights. What would you like to explore about your potential future?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [userId, setUserId] = useState('user-123');

  useEffect(() => {
    // Load user memories
    const loadMemories = async () => {
      try {
        // In a real implementation, this would fetch from your database
        const mockMemories: Memory[] = [
          { id: '1', title: 'Core Values', content: 'Integrity, compassion, growth', type: 'values', createdAt: new Date() },
          { id: '2', title: 'Childhood Wonder', content: 'First moment of pure curiosity about the universe', type: 'story', createdAt: new Date() },
          { id: '3', title: 'Growth Goals', content: 'Become a mentor and inspire others', type: 'values', createdAt: new Date() },
        ];
        setMemories(mockMemories);
      } catch (error) {
        console.error('Failed to load memories:', error);
      }
    };

    loadMemories();
  }, [userId]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Context-aware AI response
    const context = buildContext(userMessage.content);
    
    // Simulate AI response with memory integration
    setTimeout(() => {
      const responses = generateContextualResponses(context, memories);
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        context: context
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const buildContext = (userInput: string): string => {
    // Extract relevant memories and context
    const relevantMemories = memories.filter(memory => 
      userInput.toLowerCase().includes(memory.title.toLowerCase()) ||
      userInput.toLowerCase().includes(memory.content.toLowerCase().substring(0, 20).toLowerCase())
    );
    
    return `User memories: ${relevantMemories.map(m => m.title).join(', ')}. 
            User input: ${userInput}`;
  };

  const generateContextualResponses = (context: string, memories: Memory[]): string[] => {
    const memoryBased = memories.map(memory => 
      `Based on your memory of "${memory.title}", I see how this foundation has evolved. ${memory.type === 'values' ? 'These core principles continue to guide your decisions.' : 'This experience shaped your approach to challenges.'}`
    );

    const generalResponses = [
      "I can see the patterns emerging from your Origin Map and memories. Your current curiosity about growth aligns with the compassionate foundation you've built.",
      "Looking at your journey through the lens of time, I observe how your early experiences with wonder continue to influence your creative pursuits.",
      "Your memory of core values reveals the authentic path you're walking. This alignment creates powerful ripple effects I can trace through multiple timelines.",
      "From my perspective, the choices you're considering now connect directly to the meaningful moments you've preserved in your memory vault."
    ];

    return [...memoryBased, ...generalResponses];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Future Echo Dialogue</h1>
          <p className="text-xl text-[#7a7162]">
            Converse with your evolved consciousness enhanced by memory integration
          </p>
        </motion.div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] border-b border-[#e8e1d4] p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4c09a] to-[#e6d2a8] rounded-full flex items-center justify-center">
                <span className="text-2xl">🔮</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#5d5444]">Future Echo</h2>
                <p className="text-[#7a7162]">2044 Integration</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Memory Connected</span>
              </div>
            </div>
            
            {/* Memory Status */}
            <div className="mt-4 pt-4 border-t border-[#e8e1d4]">
              <div className="flex justify-between text-sm">
                <span className="text-[#7a7162]">Memory Integration:</span>
                <span className="text-[#5d5444] font-medium">{memories.length} memories active</span>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] text-[#5d5444] rounded-br-md'
                    : 'bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] text-[#5d5444] border border-[#e8e1d4] rounded-bl-md'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-[#7a7162]' : 'text-[#7a7162]'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.context && (
                    <div className="mt-2 pt-2 border-t border-[#e8e1d4]">
                      <p className="text-xs text-[#a89f91] italic">Context: {message.context.substring(0, 50)}...</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] border border-[#e8e1d4] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#d4c09a] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#e6d2a8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#f9f3e6] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-[#e8e1d4] p-6">
            <div className="flex space-x-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your Future Echo about potential informed by your memories..."
                className="flex-1 p-4 glass-panel rounded-lg border border-[#e8e1d4] focus:border-[#d4c09a] focus:outline-none min-h-[60px] max-h-32 resize-none text-[#5d5444]"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  isLoading || !input.trim()
                    ? 'bg-[#e8e1d4] text-[#7a7162] cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#d4c09a] to-[#e6d2a8] text-[#5d5444] hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#5d5444] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Send →'
                )}
              </button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setInput("How have my preserved memories shaped who I've become?")}
                className="px-3 py-1 bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] text-[#5d5444] text-sm rounded-full border border-[#e8e1d4] hover:border-[#d4c09a] transition-all duration-300"
              >
                Memory Integration
              </button>
              <button
                onClick={() => setInput("What echoes from my past values can I amplify?")}
                className="px-3 py-1 bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] text-[#5d5444] text-sm rounded-full border border-[#e8e1d4] hover:border-[#d4c09a] transition-all duration-300"
              >
                Values Amplification
              </button>
              <button
                onClick={() => setInput("Show me ripples connecting my memories to current decisions")}
                className="px-3 py-1 bg-gradient-to-r from-[#fdfdfd] to-[#fcf9f2] text-[#5d5444] text-sm rounded-full border border-[#e8e1d4] hover:border-[#d4c09a] transition-all duration-300"
              >
                Memory Ripples
              </button>
            </div>
          </div>
        </div>

        {/* Memory Preview */}
        {memories.length > 0 && (
          <motion.div
            className="glass-panel p-6 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-[#5d5444] mb-3">Active Memory Integration</h3>
            <div className="flex flex-wrap gap-2">
              {memories.slice(0, 3).map((memory) => (
                <span 
                  key={memory.id}
                  className="px-3 py-1 bg-gradient-to-r from-[#f9f3e6] to-[#fcf9f2] text-[#5d5444] text-sm rounded-full border border-[#e8e1d4]"
                >
                  📖 {memory.title}
                </span>
              ))}
              {memories.length > 3 && (
                <span className="px-3 py-1 bg-[#e8e1d4] text-[#5d5444] text-sm rounded-full">
                  +{memories.length - 3} more
                </span>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}