import React, { createContext, useState, useContext, ReactNode } from 'react';
import { api } from '../services/api';

type User = {
  id: number;
  nome: string;
  email: string;
  dt_nascimento: string;
  senha?: string;
  img_usuario: string;
  tp_usuario: number;
};

type AuthContextData = {
  user: User | null;
  passwordAuth: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: (
    emailOuId: string,
    senha: string
  ) => Promise<{ success: boolean; message?: string }>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [passwordAuth, setPasswordAuth] = useState<string | null>(null);

  const logout = () => {
    setUser(null);
    setPasswordAuth(null);
  };

  const login = async (loginInput: string, senha: string) => {
    try {
      let usuario: User;

      if (loginInput.includes('@')) {
        usuario = await api.getUserByEmail(loginInput);
      } else {
        usuario = await api.getUserByUsername(loginInput);
      }
      
      if (usuario && usuario.senha === senha) {
        setUser(usuario);
        setPasswordAuth(senha);
        return { success: true };
      } else {
        return { success: false, message: 'Login ou senha incorretos' };
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      return { success: false, message: 'Login ou senha incorretos' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, passwordAuth, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);