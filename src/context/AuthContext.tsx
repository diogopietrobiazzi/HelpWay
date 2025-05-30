import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';

type User = {
  name: string;
  email: string;
  nascimento: Date;
  password: string;
  imagem: string; 
  tipo:string;
}

type AuthContextData = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
