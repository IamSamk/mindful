
import { supabase } from "../lib/supabase";
import { toast } from "@/components/ui/use-toast";

export type NotificationPayload = {
  userId: string;
  title: string;
  message: string;
};

export const sendNotification = async (notification: NotificationPayload): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: notification.userId,
        title: notification.title,
        message: notification.message
      });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    toast({
      title: "Error",
      description: "Failed to send notification",
      variant: "destructive"
    });
    return false;
  }
};

export const sendNotificationToUser = async (
  email: string, 
  title: string, 
  message: string
): Promise<boolean> => {
  try {
    // First, get the user ID from the email by querying the users table in public schema
    // instead of trying to access auth.users directly
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    
    if (userError || !userData) {
      throw new Error("User not found");
    }
    
    // Then send the notification to that user
    return await sendNotification({
      userId: userData.id,
      title,
      message
    });
  } catch (error) {
    console.error("Error sending notification to user:", error);
    toast({
      title: "Error",
      description: "Failed to send notification",
      variant: "destructive"
    });
    return false;
  }
};
