import { useState, useCallback } from 'react';
import { useLanguage } from './useLanguage';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  message: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  needsEmergencyAttention: boolean;
}

export const useChatBot = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const { currentLanguage } = useLanguage();

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    try {
      setIsProcessing(true);

      // Add user message to history
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
      };
      setConversationHistory(prev => [...prev, userMessage]);

      // Call local LLM API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          language: currentLanguage,
          conversation_history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from LLM');
      }

      const data: LLMResponse = await response.json();

      // Add assistant message to history
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.message,
      };
      setConversationHistory(prev => [...prev, assistantMessage]);

      // Check if emergency attention is needed
      if (data.needsEmergencyAttention) {
        // Trigger emergency protocol
        triggerEmergencyProtocol(data);
      }

      return data.message;
    } catch (error) {
      console.error('Error in chat:', error);
      return 'I apologize, but I am having trouble processing your request. Please try again.';
    } finally {
      setIsProcessing(false);
    }
  }, [currentLanguage, conversationHistory]);

  const triggerEmergencyProtocol = async (data: LLMResponse) => {
    // Implement emergency protocol
    // This could include:
    // 1. Notifying supervisors
    // 2. Triggering immediate support mechanisms
    // 3. Logging the incident
    try {
      await fetch('http://localhost:8000/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_history: conversationHistory,
          sentiment: data.sentiment,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error triggering emergency protocol:', error);
    }
  };

  return {
    sendMessage,
    isProcessing,
    conversationHistory,
  };
}; 