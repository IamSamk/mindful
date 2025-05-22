
import { supabase } from "../lib/supabase";
import { toast } from "@/components/ui/use-toast";

export type UserProfile = {
  id: string;
  full_name: string | null;
  unit: string | null;
  position: string | null;
  age: number | null;
  gender: string | null;
  education_level: string | null;
  marital_status: string | null;
  years_of_service: number | null;
  height: number | null;
  weight: number | null;
  blood_group: string | null;
  medical_conditions: string[] | null;
  allergies: string[] | null;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userData.user.id)
      .maybeSingle();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    toast({
      title: "Error",
      description: "Failed to fetch user profile",
      variant: "destructive"
    });
    return null;
  }
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('user_profiles')
      .update(profile)
      .eq('id', userData.user.id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Success",
      description: "Profile updated successfully"
    });
    
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    toast({
      title: "Error",
      description: "Failed to update profile",
      variant: "destructive"
    });
    return false;
  }
};

export const changePassword = async (newPassword: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Success",
      description: "Password changed successfully"
    });
    
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to change password",
      variant: "destructive"
    });
    return false;
  }
};

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    toast({
      title: "Error",
      description: "Failed to fetch notifications",
      variant: "destructive"
    });
    return [];
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) {
      return 0;
    }
    
    const { data, error, count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userData.user.id)
      .eq('is_read', false);
    
    if (error) {
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    return 0;
  }
};
