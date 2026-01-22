
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  email: string;
  password?: string;
  progress: Record<string, number>;
  joinedAt: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  updateProgress: (courseId: string, progress: number) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('ss_property_session');
    if (savedSession) {
      const email = JSON.parse(savedSession).email;
      const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
      if (allUsers[email]) {
        setUser(allUsers[email]);
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
    const existingUser = allUsers[email.toLowerCase()];
    
    if (existingUser && existingUser.password === password) {
      setUser(existingUser);
      localStorage.setItem('ss_property_session', JSON.stringify({ email: email.toLowerCase() }));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
    const lowerEmail = email.toLowerCase();
    
    if (allUsers[lowerEmail]) return false;

    const newUser: UserData = {
      email: lowerEmail,
      password,
      progress: { 'c2': 45, 'c3': 12 }, // Demo initial progress
      joinedAt: new Date().toISOString()
    };

    allUsers[lowerEmail] = newUser;
    localStorage.setItem('ss_property_users', JSON.stringify(allUsers));
    setUser(newUser);
    localStorage.setItem('ss_property_session', JSON.stringify({ email: lowerEmail }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ss_property_session');
  };

  const updateProgress = (courseId: string, progress: number) => {
    if (!user) return;
    
    const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
    const updatedUser = {
      ...user,
      progress: { ...user.progress, [courseId]: progress }
    };
    
    allUsers[user.email] = updatedUser;
    localStorage.setItem('ss_property_users', JSON.stringify(allUsers));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProgress, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
