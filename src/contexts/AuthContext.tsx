import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { toast } from '../components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for environment variables
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.error('Required environment variables are missing');
      toast({
        title: "Configuration Error",
        description: "Application is not properly configured. Please contact support.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          console.log('Initial session loaded for user:', initialSession.user.email);
        }

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          console.log('Auth state changed:', { event, session: !!currentSession });
          
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
          } else {
            setSession(null);
            setUser(null);
          }
          
          setLoading(false);
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication. Please try refreshing the page.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // First check if the user exists
      const { data: existingUser, error: getUserError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email.trim())
        .maybeSingle();

      if (getUserError) {
        console.error('Error checking user existence:', getUserError);
      }

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw error;
      }

      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        console.log('Sign in successful:', { user: data.session.user.email });
        
        // Check if user profile exists, if not create it
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('id', data.session.user.id)
          .maybeSingle();

        if (!profile) {
          await createUserProfile(data.session.user.id, email);
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }

      return { error: null };
    } catch (err) {
      console.error('Error during sign in:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign in';
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: err as AuthError };
    }
  };

  const createUserProfile = async (userId: string, email: string) => {
    try {
      // Check if user already exists in users table
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (!existingUser) {
        // Create entry in users table
        const { error: usersError } = await supabase
          .from('users')
          .insert([
            {
              id: userId,
              email: email,
              full_name: email.split('@')[0], // Temporary name from email
              created_at: new Date().toISOString()
            }
          ]);

        if (usersError) {
          console.error('Error creating user:', usersError);
          throw usersError;
        }
      }

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (!existingProfile) {
        // Create entry in user_profiles table
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: userId,
              full_name: email.split('@')[0],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw profileError;
        }
      }

    } catch (error) {
      console.error('Error in createUserProfile:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('Attempting sign up for:', email);

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.trim())
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing user:', checkError);
      }

      if (existingUser) {
        throw new Error('An account with this email already exists');
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: email.split('@')[0]
          }
        }
      });

      if (error) {
        // Handle rate limiting error specifically
        if (error.message.includes('request this after')) {
          const waitTimeMatch = error.message.match(/\d+/);
          const waitTime = waitTimeMatch ? parseInt(waitTimeMatch[0]) : 60;
          throw new Error(`Please wait ${waitTime} seconds before trying again. This helps protect our service from abuse.`);
        }
        throw error;
      }

      if (data?.user) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account. The link will expire in 24 hours.",
          duration: 6000
        });

        // Don't create profile or set session yet - wait for email verification
        return { error: null };
      }

      return { error: null };
    } catch (err) {
      console.error('Error during sign up:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up';
      
      // Show a more user-friendly toast for rate limiting
      if (errorMessage.includes('Please wait')) {
        toast({
          title: "Please Wait",
          description: errorMessage,
          duration: 5000
        });
      } else {
        toast({
          title: "Registration Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
      
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setUser(null);
      console.log('Sign out successful');
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (err) {
      console.error('Error during sign out:', err);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut }}>
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
