'use client';

import { pipeline, env } from '@xenova/transformers';
import { prisma } from '@/lib/db';

// Disable local model loading for browser environment
env.allowLocalModels = false;

export class AIProcessor {
  private static textEmbeddingPipeline: any = null;

  static async initialize() {
    if (!this.textEmbeddingPipeline) {
      try {
        this.textEmbeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
      } catch (error) {
        console.error('Failed to initialize embedding pipeline:', error);
        throw new Error('AI service unavailable');
      }
    }
  }

  static async generateEmbedding(text: string): Promise<number[]> {
    await this.initialize();
    
    try {
      const output = await this.textEmbeddingPipeline(text, {
        pooling: 'mean',
        normalize: true,
      });
      
      return Array.from(output.data);
    } catch (error) {
      console.error('Embedding generation failed:', error);
      throw new Error('Failed to generate embedding');
    }
  }

  static async analyzePsychologicalProfile(answers: Record<string, any>): Promise<any> {
    const combinedText = Object.values(answers).join(' ');
    const embedding = await this.generateEmbedding(combinedText);
    
    // Simple archetype classification based on embedding patterns
    const archetype = this.classifyArchetype(embedding);
    
    return {
      embedding,
      archetype,
      profile: {
        coreValues: this.extractCoreValues(embedding),
        growthAreas: this.identifyGrowthAreas(embedding),
        ripplePotential: this.calculateRipplePotential(embedding)
      }
    };
  }

  private static classifyArchetype(embedding: number[]): string {
    // Simplified archetype classification
    const avg = embedding.reduce((a, b) => a + b, 0) / embedding.length;
    
    if (avg > 0.1) return 'Visionary Leader';
    if (avg > 0.05) return 'Compassionate Connector';
    if (avg > 0) return 'Analytical Innovator';
    return 'Reflective Creator';
  }

  private static extractCoreValues(embedding: number[]): string[] {
    const values = ['Compassion', 'Integrity', 'Growth', 'Connection', 'Creativity', 'Service'];
    return values.filter((_, i) => Math.abs(embedding[i % embedding.length]) > 0.05);
  }

  private static identifyGrowthAreas(embedding: number[]): string[] {
    const areas = ['Emotional Intelligence', 'Strategic Thinking', 'Creative Expression', 'Community Building'];
    return areas.filter((_, i) => Math.abs(embedding[(i + 10) % embedding.length]) < 0.02);
  }

  private static calculateRipplePotential(embedding: number[]): number {
    return Math.min(100, Math.max(0, 
      (embedding.slice(0, 10).reduce((a, b) => a + Math.abs(b), 0) * 15)
    ));
  }

  static async storeMemory(userId: string, title: string, content: string, type: string): Promise<any> {
    const embedding = await this.generateEmbedding(content);
    
    return await prisma.memory.create({
      data: {
        userId,
        title,
        content,
        type,
        embedding: JSON.stringify(embedding)
      }
    });
  }

  static async searchMemories(userId: string, query: string, limit: number = 10): Promise<any[]> {
    const queryEmbedding = await this.generateEmbedding(query);
    
    const memories = await prisma.memory.findMany({
      where: { userId },
      take: limit
    });
    
    // Simple cosine similarity calculation
    return memories.map(memory => {
      if (!memory.embedding) return { ...memory, similarity: 0 };
      
      const memoryEmbedding = JSON.parse(memory.embedding);
      const similarity = this.cosineSimilarity(queryEmbedding, memoryEmbedding);
      
      return { ...memory, similarity };
    }).sort((a, b) => b.similarity - a.similarity);
  }

  private static cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, _, i) => sum + a[i] * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }
}