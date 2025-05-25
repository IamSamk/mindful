import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Mic } from 'lucide-react';
import { processUserMessage } from '@/services/ai';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const AIChatInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting when component mounts
  useEffect(() => {
    if (user && messages.length === 0) {
      const initialGreeting: Message = {
        id: 'initial-greeting',
        role: 'assistant',
        content: `Hi! I'm your mindfulness companion. I'd love to get to know you better. How are you feeling today?`,
        timestamp: new Date(),
      };
      setMessages([initialGreeting]);
    }
  }, [user]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await processUserMessage(
        input.trim(),
        user.id,
        {
          previousMessages: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }
      );

      // Handle AI response actions
      if (response.action) {
        switch (response.action.type) {
          case 'update_profile':
            await supabase
              .from('user_profiles')
              .upsert({
                id: user.id,
                ...response.action.data,
                updated_at: new Date().toISOString()
              });
            break;
          case 'log_mood':
            await supabase
              .from('moods')
              .insert({
                user_id: user.id,
                ...response.action.data,
                created_at: new Date().toISOString()
              });
            break;
          // Add more action handlers as needed
        }
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-2xl mx-auto">
      <div className="flex items-center space-x-4 p-4 border-b">
        <Avatar>
          <AvatarImage src="/ai-avatar.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Mindful AI</h2>
          <p className="text-sm text-muted-foreground">Your wellness companion</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'assistant' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            size="icon"
          >
            {isLoading ? (
              <div className="animate-spin">⌛</div>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
          <Button size="icon" variant="outline">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatInterface; 