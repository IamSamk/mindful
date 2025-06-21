import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { toast } from '../components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("AuthProvider: Component rendering/re-rendering. State:", { loading, user: !!user });

  useEffect(() => {
    console.log("AuthProvider: useEffect triggered to check user.");
    checkUser();
  }, []);

  const checkUser = async () => {
    console.log("AuthProvider.checkUser: Starting user check.");
    try {
      const token = localStorage.getItem('auth_token');
      console.log("AuthProvider.checkUser: Token from localStorage:", token ? 'found' : 'not found');
      if (token) {
        const { userId } = authService.verifyToken(token);
        console.log("AuthProvider.checkUser: Token verified, userId:", userId);
        const userData = await authService.getCurrentUser(userId);
        console.log("AuthProvider.checkUser: Fetched user data:", userData);
        if (userData) {
          setUser(userData as User);
        }
      }
    } catch (error) {
      console.error('AuthProvider.checkUser: Error during user check.', error);
      localStorage.removeItem('auth_token');
    } finally {
      console.log("AuthProvider.checkUser: Finished user check, setting loading to false.");
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user, token } = await authService.signIn(email, password);
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { user, token } = await authService.signUp(email, password, name);
      localStorage.setItem('auth_token', token);
      setUser(user);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      localStorage.removeItem('auth_token');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
