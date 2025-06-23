import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define el tipo para los datos del usuario
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

// Define el tipo para el estado del store
interface UserState {
  token: string | null;
  user: User | null;
  setUser: (token: string, user: User) => void;
  clearUser: () => void;
}

// Crea el store de Zustand con persistencia
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      // Método para establecer el token y los datos del usuario
      setUser: (token, user) => set({ token, user }),
      // Método para limpiar los datos de la sesión
      clearUser: () => set({ token: null, user: null }),
    }),
    {
      name: 'user-storage', // Nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage para la persistencia
    }
  )
);
