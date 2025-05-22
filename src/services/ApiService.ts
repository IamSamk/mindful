import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Types remain the same for consistency
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

class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    // This should be configured based on environment
    this.baseUrl = process.env.REACT_APP_API_URL || 'https://api.police-wellbeing.org';
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Add auth token to all requests
    axios.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 responses globally
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem('authToken');
          // Trigger re-authentication
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth Methods
  async login(badgeNumber: string, password: string): Promise<UserData> {
    const response = await axios.post(`${this.baseUrl}/auth/login`, {
      badgeNumber,
      password
    });
    
    const { token, user } = response.data;
    await AsyncStorage.setItem('authToken', token);
    return user;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
    window.location.href = '/login';
  }

  // User Methods
  async getCurrentUser(): Promise<UserData> {
    const response = await axios.get(`${this.baseUrl}/users/me`);
    return response.data;
  }

  async updateUserProfile(userData: Partial<UserData>): Promise<UserData> {
    const response = await axios.patch(`${this.baseUrl}/users/me`, userData);
    return response.data;
  }

  // Chat Methods
  async sendMessage(content: string): Promise<ChatMessage> {
    const response = await axios.post(`${this.baseUrl}/chat/messages`, {
      content
    });
    return response.data;
  }

  async getChatHistory(limit: number = 50, before?: Date): Promise<ChatMessage[]> {
    const params = before ? { before: before.toISOString(), limit } : { limit };
    const response = await axios.get(`${this.baseUrl}/chat/messages`, { params });
    return response.data;
  }

  // Wellness Methods
  async saveWellnessMetric(metric: Omit<WellnessMetric, 'id' | 'userId'>): Promise<WellnessMetric> {
    const response = await axios.post(`${this.baseUrl}/wellness/metrics`, metric);
    return response.data;
  }

  async getWellnessMetrics(startDate: Date, endDate: Date): Promise<WellnessMetric[]> {
    const response = await axios.get(`${this.baseUrl}/wellness/metrics`, {
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    });
    return response.data;
  }

  // Emergency Methods
  async reportEmergency(type: 'medical' | 'security' | 'mental', details: string): Promise<void> {
    await axios.post(`${this.baseUrl}/emergency/report`, {
      type,
      details
    });
  }

  async getEmergencyContacts(): Promise<Array<{
    name: string;
    role: string;
    phone: string;
    available: boolean;
  }>> {
    const response = await axios.get(`${this.baseUrl}/emergency/contacts`);
    return response.data;
  }
}

export const apiService = new ApiService(); 