'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { submitCheckout } from '@/services/api';
import { CheckoutRequest } from '@/types';
import Button from '@/components/shared/Button';

interface ProductActionsProps {
  productId: string;
}

const ProductActions = ({ productId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItemToCart = useCartStore((state) => state.addItem);

  const { user, openAuthModal } = useAuthStore();

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addItemToCart({ product_id: productId, quantity: quantity });
    toast.success(`${quantity} x item(s) added to cart!`);
  };

  const handleCheckoutNow = async () => {
    if (!user) {
      toast.error('Please sign in to check out.');
      openAuthModal('login');
      return;
    }
    const toastId = toast.loading('Processing checkout...');

    addItemToCart({ product_id: productId, quantity: quantity });

    const cartItems = useCartStore.getState().items;

    if (cartItems.length === 0) {
      toast.error('Your cart is empty.', { id: toastId });
      return;
    }

    const checkoutData: CheckoutRequest = {
      items: cartItems,
      shipping_address: '123 Figma St, Designsville, DS 10111',
      email: user.email,
    };

    try {
      const response = await submitCheckout(checkoutData);

      if ('error' in response) {
        throw new Error(response.error);
      }

      toast.success(
        `Checkout successful! Order ID: ${response.order_id}`,
        { id: toastId, duration: 4000 }
      );
      
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Checkout failed. Please try again.',
        { id: toastId }
      );
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-4">
        <label
          htmlFor="quantity"
          className="text-sm font-medium text-gray-900"
        >
          Quantity:
        </label>
        <div className="flex items-center rounded-md border border-gray-300">
          <button
            onClick={decrement}
            className="px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-l-md transition"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={quantity}
            readOnly
            className="w-12 h-full text-center border-l border-r border-gray-300 focus:outline-none"
            aria-label="Current quantity"
          />
          <button
            onClick={increment}
            className="px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-r-md transition"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="primary"
          onClick={handleAddToCart}
          className="w-full py-4 text-base"
        >
          Add To Cart
        </Button>
        <Button
          variant="outline"
          onClick={handleCheckoutNow}
          className="w-full py-4 text-base"
        >
          Checkout Now
        </Button>
      </div>

      <div className="text-center">
        <a href="#" className="text-sm text-gray-600 underline">
          Delivery, T&C
        </a>
      </div>
    </div>
  );
};

export default ProductActions;

