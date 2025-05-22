
import { supabase } from "../lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { SurveyCategory } from "../lib/surveyData";

export const saveSurveyResponse = async (
  category: string,
  question: string,
  answer: string
): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      console.error("User is not authenticated");
      toast({
        title: "Authentication required",
        description: "Please login to save your survey responses",
        variant: "destructive"
      });
      return false;
    }
    
    const { error } = await supabase.from('survey_responses').insert({
      user_id: userId,
      category,
      question,
      answer
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
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      return [];
    }
    
    let query = supabase
      .from('survey_responses')
      .select('*')
      .eq('user_id', userId);
      
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
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
