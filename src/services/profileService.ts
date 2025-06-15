import { prisma } from '../lib/prisma';
import { authService } from './authService';
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
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    
    if (!userData) {
      throw new Error("User not authenticated");
    }
    
    return userData;
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
    const { data: userData } = await prisma.user.update({
      where: { id: authService.getCurrentUserId() },
      data: profile,
    });
    
    if (!userData) {
      throw new Error("User not authenticated");
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
    const { data: userData } = await prisma.user.update({
      where: { id: authService.getCurrentUserId() },
      data: {
        password: newPassword
      },
    });
    
    if (!userData) {
      throw new Error("User not authenticated");
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
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    
    if (!userData) {
      return [];
    }
    
    const { data, error } = await prisma.notification.findMany({
      where: {
        userId: userData.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    
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
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    
    if (!userData) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await prisma.notification.update({
      where: { id: notificationId },
      data: { is_read: true },
    });
    
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
    const { data: userData } = await prisma.user.findUnique({
      where: { id: authService.getCurrentUserId() },
    });
    
    if (!userData) {
      return 0;
    }
    
    const { data, error, count } = await prisma.notification.findMany({
      where: {
        userId: userData.id,
        is_read: false,
      },
      select: {
        id: true,
      },
    });
    
    if (error) {
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    return 0;
  }
};

export const profileService = {
  async getProfile(userId: string) {
    try {
      const profile = await prisma.profile.findUnique({
        where: { userId },
      });
      return { data: profile, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updateProfile(userId: string, updates: any) {
    try {
      const profile = await prisma.profile.upsert({
        where: { userId },
        update: updates,
        create: {
          userId,
          ...updates,
        },
      });
      return { data: profile, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updateUserProfile(userId: string, updates: any) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: updates,
      });
      return { data: user, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getProfileStats(userId: string) {
    try {
      const [moods, surveys, notifications] = await Promise.all([
        prisma.mood.count({ where: { userId } }),
        prisma.survey.count({ where: { userId } }),
        prisma.notification.count({ where: { userId } }),
      ]);

      return {
        data: {
          moods,
          surveys,
          notifications,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },
};
