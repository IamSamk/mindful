import { Capacitor } from '@capacitor/core';
import { SQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

class DatabaseService {
  private sqlite: SQLiteConnection | null = null;
  private initialized = false;

  constructor() {
    this.init();
  }

  private async init() {
    if (this.initialized) return;

    if (Capacitor.getPlatform() === 'web') {
      // Use AsyncStorage for web platform
      this.initialized = true;
      return;
    }

    try {
      this.sqlite = new SQLiteConnection(SQLite);
      await this.sqlite.open({
        database: 'police_wellbeing.db',
        encrypted: true,
        mode: 'encryption',
      });

      // Create tables
      await this.createTables();
      this.initialized = true;
    } catch (error) {
      console.error('Database initialization failed:', error);
    }
  }

  private async createTables() {
    if (!this.sqlite) return;

    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        badgeNumber TEXT UNIQUE NOT NULL,
        department TEXT NOT NULL,
        lastActive TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        isBot INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,
      `CREATE TABLE IF NOT EXISTS wellness_metrics (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        stressLevel INTEGER NOT NULL,
        moodScore INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`
    ];

    for (const query of queries) {
      await this.sqlite.execute(query);
    }
  }

  // User Methods
  async saveUser(user: UserData): Promise<void> {
    if (this.sqlite) {
      await this.sqlite.run(
        `INSERT OR REPLACE INTO users (id, name, badgeNumber, department, lastActive)
         VALUES (?, ?, ?, ?, ?)`,
        [user.id, user.name, user.badgeNumber, user.department, user.lastActive.toISOString()]
      );
    } else {
      await AsyncStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    }
  }

  async getUser(id: string): Promise<UserData | null> {
    if (this.sqlite) {
      const result = await this.sqlite.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return result.values?.length ? result.values[0] as UserData : null;
    } else {
      const data = await AsyncStorage.getItem(`user_${id}`);
      return data ? JSON.parse(data) : null;
    }
  }

  // Chat Methods
  async saveChatMessage(message: ChatMessage): Promise<void> {
    if (this.sqlite) {
      await this.sqlite.run(
        `INSERT INTO chat_messages (id, userId, content, timestamp, isBot)
         VALUES (?, ?, ?, ?, ?)`,
        [message.id, message.userId, message.content, message.timestamp.toISOString(), message.isBot ? 1 : 0]
      );
    } else {
      const key = `chat_${message.userId}_${message.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(message));
    }
  }

  async getChatHistory(userId: string): Promise<ChatMessage[]> {
    if (this.sqlite) {
      const result = await this.sqlite.query(
        'SELECT * FROM chat_messages WHERE userId = ? ORDER BY timestamp DESC',
        [userId]
      );
      return result.values as ChatMessage[];
    } else {
      const keys = await AsyncStorage.getAllKeys();
      const chatKeys = keys.filter(key => key.startsWith(`chat_${userId}`));
      const messages = await Promise.all(
        chatKeys.map(async key => {
          const data = await AsyncStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        })
      );
      return messages.filter(Boolean);
    }
  }

  // Wellness Metrics Methods
  async saveWellnessMetric(metric: WellnessMetric): Promise<void> {
    if (this.sqlite) {
      await this.sqlite.run(
        `INSERT INTO wellness_metrics (id, userId, stressLevel, moodScore, timestamp)
         VALUES (?, ?, ?, ?, ?)`,
        [metric.id, metric.userId, metric.stressLevel, metric.moodScore, metric.timestamp.toISOString()]
      );
    } else {
      const key = `wellness_${metric.userId}_${metric.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(metric));
    }
  }

  async getWellnessMetrics(userId: string, startDate: Date, endDate: Date): Promise<WellnessMetric[]> {
    if (this.sqlite) {
      const result = await this.sqlite.query(
        `SELECT * FROM wellness_metrics 
         WHERE userId = ? AND timestamp BETWEEN ? AND ?
         ORDER BY timestamp DESC`,
        [userId, startDate.toISOString(), endDate.toISOString()]
      );
      return result.values as WellnessMetric[];
    } else {
      const keys = await AsyncStorage.getAllKeys();
      const metricKeys = keys.filter(key => key.startsWith(`wellness_${userId}`));
      const metrics = await Promise.all(
        metricKeys.map(async key => {
          const data = await AsyncStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        })
      );
      return metrics
        .filter(Boolean)
        .filter(metric => {
          const timestamp = new Date(metric.timestamp);
          return timestamp >= startDate && timestamp <= endDate;
        });
    }
  }
}

export const databaseService = new DatabaseService(); 