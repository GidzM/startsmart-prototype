
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  password?: string;
  progress: Record<string, number>;
  joinedAt: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProgress: (courseId: string, progress: number) => void;
  updateUser: (newData: Partial<UserData>) => boolean;
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

  const signup = (name: string, email: string, password: string) => {
    const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
    const lowerEmail = email.toLowerCase();
    
    if (allUsers[lowerEmail]) return false;

    const newUser: UserData = {
      name: name || email.split('@')[0],
      email: lowerEmail,
      password,
      progress: { 'c2': 45, 'c3': 12 },
      joinedAt: new Date().toISOString()
    };

    allUsers[lowerEmail] = newUser;
    localStorage.setItem('ss_property_users', JSON.stringify(allUsers));
    setUser(newUser);
    localStorage.setItem('ss_property_session', JSON.stringify({ email: lowerEmail }));
    return true;
  };

  const updateUser = (newData: Partial<UserData>) => {
    if (!user) return false;
    
    const allUsers = JSON.parse(localStorage.getItem('ss_property_users') || '{}');
    const oldEmail = user.email;
    const newEmail = (newData.email || oldEmail).toLowerCase();

    // Check if new email already exists (and it's not the current user's)
    if (newData.email && newEmail !== oldEmail && allUsers[newEmail]) {
      return false;
    }

    const updatedUser = {
      ...user,
      ...newData,
      email: newEmail
    };

    // If email changed, remove old key and add new one
    if (newEmail !== oldEmail) {
      delete allUsers[oldEmail];
    }
    
    allUsers[newEmail] = updatedUser;
    localStorage.setItem('ss_property_users', JSON.stringify(allUsers));
    localStorage.setItem('ss_property_session', JSON.stringify({ email: newEmail }));
    setUser(updatedUser);
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
    <AuthContext.Provider value={{ user, login, signup, logout, updateProgress, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
							  
  if (!context) throw new Error('useAuth must be used within AuthProvider');
   
  return context;
};

