// This is a mock service. In a real application, these functions would
// make API calls to your backend server, which would then interact with the database.

import { authService } from './authService';

async function getCurrentUserId(): Promise<string | null> {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;
        const { userId } = authService.verifyToken(token);
        return userId;
    } catch {
        return null;
    }
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string | null;
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export async function getUserProfile(): Promise<UserProfile | null> {
    const userId = await getCurrentUserId();
    if (!userId) return null;
    console.log(`MOCK API: Fetching profile for user ${userId}`);
    return {
        id: userId,
        name: 'Mock User',
        email: 'user@example.com',
        bio: 'This is a mock bio from the service.',
    };
}

export async function updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const userId = await getCurrentUserId();
    if (!userId) return null;
    console.log(`MOCK API: Updating profile for user ${userId} with`, updates);
    return {
        id: userId,
        name: updates.name || 'Mock User',
        email: 'user@example.com',
        bio: updates.bio || 'This is a mock bio from the service.',
    };
}

export async function changePassword(password: string): Promise<{ success: boolean }> {
    const userId = await getCurrentUserId();
    if (!userId) return { success: false };
    console.log(`MOCK API: Changing password for user ${userId}`);
    return { success: true };
}

export async function getNotifications(): Promise<Notification[]> {
    const userId = await getCurrentUserId();
    if (!userId) return [];
    console.log(`MOCK API: Getting notifications for user ${userId}`);
    return [
        { id: '1', title: 'Welcome!', message: 'Thanks for joining Mindful.', read: false, createdAt: new Date().toISOString() },
        { id: '2', title: 'New Activity', message: 'A new breathing exercise is available.', read: true, createdAt: new Date().toISOString() },
    ];
}

export async function getUnreadNotificationsCount(): Promise<number> {
    const userId = await getCurrentUserId();
    if (!userId) return 0;
    console.log(`MOCK API: Getting unread notifications for user ${userId}`);
    const notifs = await getNotifications();
    return notifs.filter(n => !n.read).length;
}

export async function markNotificationAsRead(notificationId: string): Promise<{ success: boolean }> {
    const userId = await getCurrentUserId();
    if (!userId) return { success: false };
    console.log(`MOCK API: Marking notification ${notificationId} as read for user ${userId}`);
    return { success: true };
}

export const profileService = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    getNotifications,
    getUnreadNotificationsCount,
    markNotificationAsRead,
};
