import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('authToken') || null,
  setToken: (token) => {
    localStorage.setItem('authToken', token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({ token: null });
  },
}));
