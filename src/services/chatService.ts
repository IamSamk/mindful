// Mock chat service - replace with actual API calls when backend is ready
export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  action?: {
    type: string;
    data: any;
  };
}

export const sendChatMessage = async (
  message: string,
  userId: string,
  context: {
    previousMessages: Array<{ role: 'assistant' | 'user'; content: string }>;
  }
): Promise<ChatResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock response - replace with actual AI integration
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
    return {
      message: "Hello! I'm here to support you. How are you feeling today?",
      action: {
        type: 'greeting',
        data: { timestamp: new Date() }
      }
    };
  }
  
  if (lowercaseMessage.includes('help') || lowercaseMessage.includes('support')) {
    return {
      message: "I'm here to help! You can ask me about stress management, mindfulness techniques, or just chat about how you're feeling.",
      action: {
        type: 'support_offered',
        data: { topics: ['stress', 'mindfulness', 'mood'] }
      }
    };
  }
  
  return {
    message: "Thank you for sharing that with me. I'm here to listen and support you. Is there anything specific you'd like to talk about?",
    action: {
      type: 'general_response',
      data: { messageType: 'supportive' }
    }
  };
};

export const getChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return empty history for now - replace with actual database query
  return [];
};

export const saveChatMessage = async (
  userId: string,
  message: ChatMessage
): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock save - replace with actual database save
  console.log('Saving chat message:', { userId, message });
};
