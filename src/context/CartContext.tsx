'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types';

// Define the state shape and EXPORT it
export interface CartState {
  items: CartItem[];
  isCartModalOpen: boolean;
}

export interface CartActions {
  addItem: (item: { product_id: string; quantity: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;

  clearCart: () => void;
  getItemCount: () => number;

  openCartModal: () => void;
  closeCartModal: () => void;
}


export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      items: [],
      isCartModalOpen: false,

      openCartModal: () => set({ isCartModalOpen: true }),
      closeCartModal: () => set({ isCartModalOpen: false }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.product_id === newItem.product_id
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingItemIndex];
            updatedItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + newItem.quantity,
            };
            return { items: updatedItems };
          } else {
            return { items: [...state.items, newItem] };
          }
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }));
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeItem(productId);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.product_id === productId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          }));
        }
      },

      /**
       * Clear all items from the cart.
       */
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'vfgl-cart-storage', // Name of the item in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
