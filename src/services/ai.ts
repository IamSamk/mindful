import { supabase } from '@/integrations/supabase/client';

interface AIResponse {
  message: string;
  action?: {
    type: 'update_profile' | 'log_mood' | 'suggest_activity';
    data: any;
  };
}

export const processUserMessage = async (
  message: string,
  userId: string,
  context: {
    previousMessages: Array<{ role: 'assistant' | 'user'; content: string }>;
  }
): Promise<AIResponse> => {
  try {
    // TODO: Replace with your actual LLM API call
    // For now, we'll use a simple rule-based response system
    const lowercaseMessage = message.toLowerCase();
    
    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Initial conversation flow
    if (!profile?.full_name || !profile?.bio) {
      if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
        return {
          message: "Hi! I'd love to get to know you better. What's your name?",
          action: {
            type: 'update_profile',
            data: { needsName: true }
          }
        };
      }

      if (context.previousMessages.some(m => m.content.includes("What's your name?"))) {
        return {
          message: `Nice to meet you! How would you describe yourself in a few words?`,
          action: {
            type: 'update_profile',
            data: { full_name: message }
          }
        };
      }

      if (context.previousMessages.some(m => m.content.includes('describe yourself'))) {
        return {
          message: "Thank you for sharing! How are you feeling today?",
          action: {
            type: 'update_profile',
            data: { bio: message }
          }
        };
      }
    }

    // Mood tracking
    if (
      lowercaseMessage.includes('feel') ||
      lowercaseMessage.includes('feeling') ||
      lowercaseMessage.includes('mood')
    ) {
      let moodType = 'neutral';
      let intensity = 3;

      if (lowercaseMessage.includes('happy') || lowercaseMessage.includes('good')) {
        moodType = 'positive';
        intensity = 4;
      } else if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('bad')) {
        moodType = 'negative';
        intensity = 2;
      }

      return {
        message: `I understand you're feeling ${moodType}. Would you like to explore some activities that might help enhance your mood?`,
        action: {
          type: 'log_mood',
          data: { moodType, intensity, notes: message }
        }
      };
    }

    // Default response with activity suggestion
    return {
      message: "I'm here to support you. Would you like to try a quick mindfulness exercise?",
      action: {
        type: 'suggest_activity',
        data: {
          activity: 'breathing_exercise',
          duration: '5min'
        }
      }
    };

  } catch (error) {
    console.error('Error processing message:', error);
    return {
      message: "I apologize, but I'm having trouble processing your message. Could you try rephrasing that?"
    };
  }
}; 