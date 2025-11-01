'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/context/CartContext';
import { HydratedCartItem } from './CartModal';

interface CartModalItemProps {
  item: HydratedCartItem;
}

const CartModalItem = ({ item }: CartModalItemProps) => {
  const { product, quantity } = item;
  
  const { updateQuantity, removeItem } = useCartStore();

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <div className="relative h-full w-full bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs text-center">No Image</span>
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </h3>
            <p className="ml-4">${(product.price * quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {product.category}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Unit Price: ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-1 items-center justify-between text-sm mt-4">
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:bg-gray-50"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
              aria-label="Remove item"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartModalItem;