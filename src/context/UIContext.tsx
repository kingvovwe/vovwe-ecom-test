'use client';

import { create } from 'zustand';

interface UIState {
  isSearchModalOpen: boolean;
}

interface UIActions {
  openSearchModal: () => void;
  closeSearchModal: () => void;
}

export const useUIStore = create<UIState & UIActions>()((set) => ({
  isSearchModalOpen: false,

  // Actions
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
}));