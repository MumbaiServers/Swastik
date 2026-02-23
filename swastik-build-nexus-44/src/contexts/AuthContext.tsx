import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/services/cmsApi';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount and validate it
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);

        // Validate token by calling /auth/me in background
        authApi.me().then((res) => {
          // Token is valid — update user data with latest from server
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('admin_user', JSON.stringify(res.user));
          }
        }).catch(() => {
          // Token is invalid or expired — clear auth state
          console.warn('Auth token expired, logging out');
          setUser(null);
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        });
      } catch (error) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);

      if (response.token && response.user) {
        setUser(response.user);
        localStorage.setItem('admin_token', response.token);
        localStorage.setItem('admin_user', JSON.stringify(response.user));
        return true;
      }

      return false;
    } catch (error: any) {
      console.error('Login failed:', error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};