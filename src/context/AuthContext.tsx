'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

// Store's state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthModalOpen: boolean;
  authModalView: 'login' | 'register';
}

// Store's actions
interface AuthActions {
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  openAuthModal: (view: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: 'login' | 'register') => void;
}


export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthModalOpen: false,
      authModalView: 'login',

      // Actions
      setAuth: (token, user) => set({ user, token, isAuthModalOpen: false }),
      logout: () => set({ user: null, token: null }),
      openAuthModal: (view) => set({ isAuthModalOpen: true, authModalView: view }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      setAuthModalView: (view) => set({ authModalView: view }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);