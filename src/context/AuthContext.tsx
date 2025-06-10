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

  const logout = () => setUser(null);

  const login = async (loginInput: string, senha: string) => {
    if (!loginInput.includes('@')) {
      return { success: false, message: 'Por favor, use seu email para fazer login.' };
    }

    try {
      const usuario: User = await api.getUserByEmail(loginInput);

      if (usuario && usuario.senha === senha) {
        setUser(usuario);
        return { success: true };
      } else {
        return { success: false, message: 'Email ou senha incorretos' };
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      return { success: false, message: 'Email não encontrado ou erro de conexão' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);