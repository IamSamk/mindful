// This is a mock service. In a real application, these functions would
// make API calls to your backend server, which would then interact with the database.

export const moodService = {
  async logMood(userId: string, value: number, note?: string) {
    console.log(`MOCK API: Logging mood for user ${userId}`, { value, note });
    // On the server, this would be:
    // return prisma.mood.create({ data: { userId, value, note } });
    return {
      data: { id: 'mock-mood-id', userId, value, note },
      error: null
    };
  },

  async getMoods(userId: string, limit = 30) {
    console.log(`MOCK API: Getting ${limit} moods for user ${userId}`);
    // On the server, this would be:
    // return prisma.mood.findMany({ where: { userId }, take: limit });
    return {
        data: [
            { id: '1', value: 4, note: 'Feeling great today!', createdAt: new Date() },
            { id: '2', value: 2, note: 'A bit stressed.', createdAt: new Date() },
        ],
        error: null
    };
  },

  async getMoodStats(userId: string) {
    console.log(`MOCK API: Getting mood stats for user ${userId}`);
    return {
      data: {
        average: 3.5,
        recentMood: 4,
        total: 30,
      },
      error: null,
    };
  },
};
