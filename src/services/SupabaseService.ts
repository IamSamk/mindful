import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface UserData {
  id: string;
  name: string;
  badgeNumber: string;
  department: string;
  lastActive: Date;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  isBot: boolean;
}

export interface WellnessMetric {
  id: string;
  userId: string;
  stressLevel: number;
  moodScore: number;
  timestamp: Date;
}

class SupabaseService {
  private supabase;

  constructor() {
    // You'll get these values from your Supabase project settings
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
    
    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  }

  // Auth Methods
  async login(badgeNumber: string, password: string): Promise<UserData | null> {
    const { data: { user }, error } = await this.supabase.auth.signInWithPassword({
      email: `${badgeNumber}@police.gov.in`, // Using badge number as email
      password,
    });

    if (error) throw error;

    if (user) {
      const { data } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return data as UserData;
    }

    return null;
  }

  async logout(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  // User Methods
  async getCurrentUser(): Promise<UserData | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return null;

    const { data } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return data as UserData;
  }

  async updateUserProfile(userData: Partial<UserData>): Promise<UserData | null> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return null;

    const { data, error } = await this.supabase
      .from('users')
      .update(userData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as UserData;
  }

  // Chat Methods
  async sendMessage(content: string): Promise<ChatMessage> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const message = {
      userId: user.id,
      content,
      timestamp: new Date(),
      isBot: false,
    };

    const { data, error } = await this.supabase
      .from('chat_messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;
    return data as ChatMessage;
  }

  async getChatHistory(limit: number = 50): Promise<ChatMessage[]> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return [];

    const { data, error } = await this.supabase
      .from('chat_messages')
      .select('*')
      .eq('userId', user.id)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data as ChatMessage[];
  }

  // Wellness Methods
  async saveWellnessMetric(metric: Omit<WellnessMetric, 'id' | 'userId'>): Promise<WellnessMetric> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const wellnessData = {
      ...metric,
      userId: user.id,
    };

    const { data, error } = await this.supabase
      .from('wellness_metrics')
      .insert([wellnessData])
      .select()
      .single();

    if (error) throw error;
    return data as WellnessMetric;
  }

  async getWellnessMetrics(startDate: Date, endDate: Date): Promise<WellnessMetric[]> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) return [];

    const { data, error } = await this.supabase
      .from('wellness_metrics')
      .select('*')
      .eq('userId', user.id)
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data as WellnessMetric[];
  }

  // Emergency Methods
  async reportEmergency(type: 'medical' | 'security' | 'mental', details: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser();
    
    if (!user) throw new Error('Not authenticated');

    const { error } = await this.supabase
      .from('emergency_reports')
      .insert([{
        userId: user.id,
        type,
        details,
        timestamp: new Date(),
        status: 'pending'
      }]);

    if (error) throw error;
  }

  async getEmergencyContacts(): Promise<Array<{
    name: string;
    role: string;
    phone: string;
    available: boolean;
  }>> {
    const { data, error } = await this.supabase
      .from('emergency_contacts')
      .select('*')
      .eq('active', true);

    if (error) throw error;
    return data;
  }

  // Real-time subscriptions
  subscribeToEmergencyAlerts(callback: (alert: any) => void) {
    return this.supabase
      .channel('emergency_alerts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'emergency_alerts'
      }, callback)
      .subscribe();
  }
}

export const supabaseService = new SupabaseService(); 