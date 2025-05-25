import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';
type LearningResource = Database['public']['Tables']['learning_resources']['Row'];
import { learningResources } from '../lib/data';

export const getLearningResources = async (): Promise<{ data: LearningResource[] | null; error: any }> => {
  try {
    // Use the dummy data directly since we don't have a learning_resources table in Supabase yet
    console.log('Using dummy learning resources data');
    return { data: learningResources as LearningResource[], error: null };
  } catch (error) {
    console.error('Unexpected error in getLearningResources:', error);
    // Fall back to dummy data in case of unexpected errors
    return { data: learningResources as LearningResource[], error };
  }
};

export const getLearningResourcesByCategory = async (category: string): Promise<{ data: LearningResource[] | null; error: any }> => {
  try {
    // Filter dummy data by category
    const filteredDummyData = learningResources.filter(
      resource => resource.category.toLowerCase() === category.toLowerCase()
    );
    return { data: filteredDummyData as LearningResource[], error: null };
  } catch (error) {
    console.error('Error in getLearningResourcesByCategory:', error);
    // Filter dummy data as fallback
    const filteredDummyData = learningResources.filter(
      resource => resource.category.toLowerCase() === category.toLowerCase()
    );
    return { data: filteredDummyData as LearningResource[], error };
  }
};

export const getLearningResourceById = async (id: string): Promise<{ data: LearningResource | null; error: any }> => {
  try {
    // Find in dummy data
    const dummyResource = learningResources.find(resource => resource.id === id);
    return { data: dummyResource as LearningResource || null, error: null };
  } catch (error) {
    console.error('Error in getLearningResourceById:', error);
    // Find in dummy data as fallback
    const dummyResource = learningResources.find(resource => resource.id === id);
    return { data: dummyResource as LearningResource || null, error };
  }
};

export const searchLearningResources = async (query: string): Promise<{ data: LearningResource[] | null; error: any }> => {
  try {
    // Search in dummy data
    const filteredDummyData = learningResources.filter(
      resource => 
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase()) ||
        resource.category.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filteredDummyData as LearningResource[], error: null };
  } catch (error) {
    console.error('Error in searchLearningResources:', error);
    // Search in dummy data as fallback
    const filteredDummyData = learningResources.filter(
      resource => 
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.description.toLowerCase().includes(query.toLowerCase()) ||
        resource.category.toLowerCase().includes(query.toLowerCase())
    );
    return { data: filteredDummyData as LearningResource[], error };
  }
};
