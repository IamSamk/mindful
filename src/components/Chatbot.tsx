import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChatMessage, getChatHistory, ChatMessage } from "../services/chatService";
import { useAuth } from "../contexts/AuthContext";
import { MessageCircle, Send, Loader2, Brain } from "lucide-react";
import TranslateText from "./TranslateText";
import { toast } from "@/components/ui/use-toast";

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const history = await getChatHistory(user.id);
          if (history.length > 0) {
            setMessages(history);
          } else {
            // Add welcome message if there is no chat history
            setMessages([
              {
                id: 'welcome',
                role: "assistant",
                content: "Hello! I'm here to listen and support you. How are you feeling today?",
                timestamp: new Date()
              }
            ]);
          }
        } catch (error) {
          console.error("Error loading chat history:", error);
          toast({
            title: "Error",
            description: "Failed to load chat history",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        // Clear messages if user logs out
        setMessages([
          {
            id: 'signin-required',
            role: "assistant",
            content: "Please sign in to use the chat feature.",
            timestamp: new Date()
          }
        ]);
      }
    };
    
    fetchChatHistory();
  }, [user]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to use the chat feature",
        variant: "destructive"
      });
      return;
    }
    
    const userMessage = input;
    setInput("");
    
    // Add user message to the chat immediately
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    
    setIsLoading(true);
    
    try {
      const response = await sendChatMessage(userMessage, user.id, {
        previousMessages: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      });
      
      if (response) {
        // Add AI response to the chat
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.message,
          timestamp: new Date()
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Error",
        description: "Something went wrong with the chat service",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-[600px] flex flex-col rounded-xl glass-card">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Brain className="text-primary w-5 h-5" />
        <h2 className="text-lg font-semibold">
          <TranslateText text="AI Mental Health Support" />
        </h2>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content.split("\n").map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span><TranslateText text="Thinking..." /></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !user}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {!user && (
          <p className="text-sm text-muted-foreground mt-2 text-center">
            <TranslateText text="Please sign in to use the chat feature" />
          </p>
        )}
      </form>
    </div>
  );
};

export default Chatbot;
