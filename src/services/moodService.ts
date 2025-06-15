import { prisma } from '../lib/prisma';
import { authService } from './authService';

export const moodService = {
  async addMood(userId: string, value: number, note?: string) {
    try {
      const mood = await prisma.mood.create({
        data: {
          userId,
          value,
          note,
        },
      });
      return { data: mood, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getMoods(userId: string, limit = 30) {
    try {
      const moods = await prisma.mood.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return { data: moods, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getMoodStats(userId: string) {
    try {
      const moods = await prisma.mood.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 30,
      });

      const average = moods.reduce((acc, mood) => acc + mood.value, 0) / moods.length;
      const recentMood = moods[0]?.value || 0;

      return {
        data: {
          average,
          recentMood,
          total: moods.length,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },
};
