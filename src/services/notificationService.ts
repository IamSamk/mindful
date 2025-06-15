import { prisma } from '../lib/prisma';
import { authService } from './authService';
import { toast } from "@/components/ui/use-toast";

export type NotificationPayload = {
  userId: string;
  title: string;
  message: string;
};

export const sendNotification = async (notification: NotificationPayload): Promise<boolean> => {
  try {
    const { error } = await prisma.notification.create({
      data: {
        userId: notification.userId,
        title: notification.title,
        message: notification.message
      },
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
    const { data: userData, error: userError } = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });
    
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

export const notificationService = {
  async createNotification(userId: string, title: string, message: string) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          title,
          message,
        },
      });
      return { data: notification, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getNotifications(userId: string, limit = 20) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return { data: notifications, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async markAsRead(notificationId: string) {
    try {
      const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      });
      return { data: notification, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUnreadCount(userId: string) {
    try {
      const count = await prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      });
      return { data: count, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
