'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ShoppingBag, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { getProductById, submitCheckout } from '@/services/api';
import { Product, CheckoutRequest } from '@/types';

import Button from '@/components/shared/Button';
import CartModalItem from './CartModalItem';

// Define the shape of a cart item + its full product details
export interface HydratedCartItem {
  product: Product;
  quantity: number;
}

const CartModal = () => {
  const {
    items,
    isCartModalOpen,
    closeCartModal,
    getItemCount,
    clearCart,
  } = useCartStore();
  const { user, openAuthModal } = useAuthStore();

  const [hydratedItems, setHydratedItems] = useState<HydratedCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [failedItemCount, setFailedItemCount] = useState(0);

  // Re-fetch product details whenever the modal opens or items change
  useEffect(() => {
    if (isCartModalOpen && items.length > 0) {
      setIsLoading(true);
      setFailedItemCount(0);
      
      const fetchProductDetails = async () => {
        const promises = items.map(async (item) => {
          const product = await getProductById(item.product_id);
          return { product, quantity: item.quantity };
        });

        const results = await Promise.all(promises);
        
        const validItems: HydratedCartItem[] = [];
        let failedCount = 0;
        
        results.forEach((item) => {
          if (item.product !== null) {
            validItems.push(item as HydratedCartItem);
          } else {
            failedCount++;
          }
        });
        
        setHydratedItems(validItems);
        setFailedItemCount(failedCount);
        setIsLoading(false);
      };
      fetchProductDetails();
    } else if (items.length === 0) {
      setHydratedItems([]); // Clear if cart is emptied
      setFailedItemCount(0);
    }
  }, [items, isCartModalOpen]);

  
  const total = hydratedItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const itemCount = getItemCount();

  
  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to check out.');
      closeCartModal();
      openAuthModal('login');
      return;
    }

    // If all items failed, don't proceed
    if (hydratedItems.length === 0) {
       toast.error('Your cart has no valid items to check out.', {
        icon: '🛒',
       });
       return;
    }

    setIsCheckingOut(true);
    const toastId = toast.loading('Processing checkout...');

    // Create checkout data *only* from items that successfully loaded
    const validCheckoutItems = hydratedItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    const checkoutData: CheckoutRequest = {
      items: validCheckoutItems,
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
      clearCart();
      closeCartModal();
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error(
        error instanceof Error ? error.message : 'Checkout failed.',
        { id: toastId }
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <Transition.Root show={isCartModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCartModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    
                    <div className="flex items-start justify-between p-6 border-b border-gray-200">
                      <Dialog.Title className="text-xl font-bold text-gray-900">
                        Shopping Cart ({itemCount})
                      </Dialog.Title>
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-600"
                        onClick={closeCartModal}
                      >
                        <X size={24} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Cart Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      
                      
                      {failedItemCount > 0 && (
                        <div className="rounded-md bg-yellow-50 p-4 mb-4 border border-yellow-200">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <AlertTriangle className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-yellow-800">
                                Some items are unavailable
                              </h3>
                              <p className="mt-1 text-sm text-yellow-700">
                                {failedItemCount} item(s) from your cart are old or no longer
                                exist and have been ignored.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {isLoading && items.length > 0 && (
                        <p className="text-gray-500">Loading cart items...</p>
                      )}

                      {!isLoading && hydratedItems.length > 0 && (
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {hydratedItems.map((item) => (
                            <CartModalItem key={item.product.id} item={item} />
                          ))}
                        </ul>
                      )}

                      {/* --- Empty state logic --- */}
                      {!isLoading && items.length === 0 && (
                        <div className="text-center py-12">
                          <ShoppingBag size={48} className="mx-auto text-gray-300" />
                          <p className="mt-4 text-lg font-medium text-gray-700">
                            Your cart is empty
                          </p>
                          <p className="mt-2 text-sm text-gray-500">
                            Looks like you haven't added anything yet.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* --- Footer / Checkout Area --- */}
                    {items.length > 0 && (
                      <div className="border-t border-gray-200 p-6">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <p>Subtotal</p>
                          <p>${total.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Button
                            variant="primary"
                            className="w-full py-4"
                            onClick={handleCheckout}
                            disabled={isCheckingOut || isLoading || hydratedItems.length === 0}
                          >
                            {isCheckingOut ? 'Processing...' : 'Checkout'}
                          </Button>
                        </div>

                        <div className="mt-4 flex justify-between text-center">
                          <button
                            type="button"
                            className="text-sm font-medium text-gray-700 hover:underline"
                            onClick={closeCartModal}
                          >
                            Continue Shopping
                          </button>
                          <button
                            type="button"
                            className="text-sm font-medium text-red-600 hover:underline"
                            onClick={() => {
                              clearCart();
                            }}
                          >
                            Clear Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartModal;