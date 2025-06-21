import { learningResources } from '../lib/data';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  category: string;
  timeToRead: string;
  content: string;
  videoUrl: string;
}

// Use the dummy data directly since we don't have a learning_resources table in Prisma yet
export const getLearningResources = async (): Promise<{ data: LearningResource[] }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: learningResources
  };
};

export const getLearningResourceById = async (id: string): Promise<LearningResource | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const resource = learningResources.find(r => r.id === id);
  return resource || null;
};

export const getLearningResourcesByCategory = async (category: string): Promise<LearningResource[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  if (category.toLowerCase() === 'all') {
    return learningResources;
  }
  
  return learningResources.filter(r => r.category.toLowerCase() === category.toLowerCase());
};

export const searchLearningResources = async (query: string): Promise<LearningResource[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowercaseQuery = query.toLowerCase();
  return learningResources.filter(r => 
    r.title.toLowerCase().includes(lowercaseQuery) ||
    r.description.toLowerCase().includes(lowercaseQuery) ||
    r.content.toLowerCase().includes(lowercaseQuery)
  );
};
