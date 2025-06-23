import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  lastname: string;
  alias: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null, // <-- Añadido
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }), // <-- Añadido
      logout: () => set({ token: null, user: null }), // <-- Modificado
    }),
    {
      name: 'auth-storage',
    }
  )
);
