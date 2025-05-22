
import { supabase } from "../integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export type Message = {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessage = async (message: string, messages: Message[]): Promise<string | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      console.error("User is not authenticated");
      toast({
        title: "Authentication required",
        description: "Please login to use the chat feature",
        variant: "destructive"
      });
      return null;
    }
    
    // Format messages for the Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Add the new user message
    formattedMessages.push({
      role: 'user',
      content: message
    });
    
    console.log("Sending message to Gemini API:", formattedMessages);
    
    // Call our edge function
    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: {
        messages: formattedMessages,
        userId
      }
    });
    
    if (error) {
      console.error("Error calling gemini-chat function:", error);
      throw new Error(error.message || "Failed to get a response");
    }
    
    console.log("Received response from Gemini API:", data);
    return data.response;
  } catch (error) {
    console.error("Error sending message:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to send message",
      variant: "destructive"
    });
    return null;
  }
};

export const loadChatHistory = async (): Promise<Message[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    
    if (!userId) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    // Convert from database format to Message format
    return data.map(msg => ({
      role: msg.is_from_user ? 'user' : 'assistant',
      content: msg.content
    }));
  } catch (error) {
    console.error("Error loading chat history:", error);
    toast({
      title: "Error",
      description: "Failed to load chat history",
      variant: "destructive"
    });
    return [];
  }
};
