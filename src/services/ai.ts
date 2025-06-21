import { prisma } from '@/lib/prisma';

interface AIResponse {
  message: string;
  action?: {
    type: 'update_profile' | 'log_mood' | 'suggest_activity';
    data: any;
  };
}

// This function now simulates a backend call and AI logic.
// It does not and should not access the database directly.
export const processUserMessage = async (
  message: string,
  userId: string,
  context: {
    previousMessages: Array<{ role: 'assistant' | 'user'; content: string }>;
  }
): Promise<AIResponse> => {
  console.log("Processing message through mock AI service:", { message, userId });
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const lowercaseMessage = message.toLowerCase();

  // In a real app, you would fetch the user's profile via an API call.
  // We'll mock the check here.
  const hasProfile = context.previousMessages.some(m => m.content.includes("Nice to meet you"));

  // Initial conversation flow
  if (!hasProfile) {
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello')) {
      return {
        message: "Hi! I'd love to get to know you better. What should I call you?",
      };
    }

    if (context.previousMessages.some(m => m.content.includes("What should I call you?"))) {
      // The user is providing their name.
      return {
        message: `Nice to meet you, ${message}! How are you feeling today?`,
        action: {
          type: 'update_profile', // The component will handle calling the API to update the profile
          data: { name: message }
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
      message: `I understand you're feeling ${moodType}. Thanks for sharing. Would you like to try an activity?`,
      action: {
        type: 'log_mood', // The component will handle calling the API to log the mood
        data: { value: intensity, note: message }
      }
    };
  }

  // Default response
  return {
    message: "That's interesting. Tell me more.",
  };
}; 