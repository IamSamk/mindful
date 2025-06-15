import { prisma } from '../lib/prisma';
import { authService } from './authService';
import { toast } from "@/components/ui/use-toast";
import { SurveyCategory } from "../lib/surveyData";

export const saveSurveyResponse = async (
  category: string,
  question: string,
  answer: string
): Promise<boolean> => {
  try {
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    const userId = userData?.id;
    
    if (!userId) {
      console.error("User is not authenticated");
      toast({
        title: "Authentication required",
        description: "Please login to save your survey responses",
        variant: "destructive"
      });
      return false;
    }
    
    const { error } = await prisma.surveyResponse.create({
      data: {
        userId,
        category,
        question,
        answer
      },
    });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error saving survey response:", error);
    toast({
      title: "Error",
      description: "Failed to save survey response",
      variant: "destructive"
    });
    return false;
  }
};

export const getSurveyResponses = async (category?: string): Promise<any[]> => {
  try {
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    const userId = userData?.id;
    
    if (!userId) {
      return [];
    }
    
    let query = prisma.surveyResponse.findMany({
      where: {
        userId,
        category: category || undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    toast({
      title: "Error",
      description: "Failed to load survey responses",
      variant: "destructive"
    });
    return [];
  }
};

export const surveyService = {
  async submitSurvey(userId: string, responses: any) {
    try {
      const survey = await prisma.survey.create({
        data: {
          userId,
          responses,
        },
      });
      return { data: survey, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getSurveys(userId: string, limit = 10) {
    try {
      const surveys = await prisma.survey.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return { data: surveys, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getSurveyStats(userId: string) {
    try {
      const surveys = await prisma.survey.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return {
        data: {
          total: surveys.length,
          lastSubmission: surveys[0]?.createdAt || null,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },
};
