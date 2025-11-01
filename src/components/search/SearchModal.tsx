'use client';

import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Search, X } from 'lucide-react';
import { useUIStore } from '@/context/UIContext';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import Image from 'next/image';
import { productImages, defaultProductImage } from '@/lib/imageMap';
import { useRouter } from 'next/navigation';

const SearchModal = () => {
  const { isSearchModalOpen, closeSearchModal } = useUIStore();
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    if (isSearchModalOpen && allProducts.length === 0) {
      setIsLoading(true);
      getProducts().then((products) => {
        setAllProducts(products);
        setIsLoading(false);
      });
    }
  }, [isSearchModalOpen, allProducts.length]);

  // Filter products based on query
  const filteredProducts =
    query.length < 2 // Only start searching after 2 chars
      ? []
      : allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleClose = () => {
    setQuery('');
    closeSearchModal();
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
    handleClose();
  };

  return (
    <Transition.Root show={isSearchModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[10vh]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full h-16 pl-16 pr-16 text-lg border-b border-gray-200 focus:outline-none focus:ring-0"
                  autoFocus
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-6">
                  <Search size={24} className="text-gray-400" />
                </div>
                <button
                  onClick={handleClose}
                  className="absolute inset-y-0 right-0 flex items-center pr-6"
                >
                  <X size={24} className="text-gray-400 hover:text-gray-700" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading && (
                  <p className="p-6 text-gray-500">Loading products...</p>
                )}
                {!isLoading && query.length < 2 && (
                   <p className="p-6 text-gray-500">
                    Keep typing to see results...
                  </p>
                )}
                {!isLoading && query.length >= 2 && filteredProducts.length === 0 && (
                  <p className="p-6 text-gray-500">
                    No results found for "{query}"
                  </p>
                )}
                {filteredProducts.length > 0 && (
                  <ul className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => handleLinkClick(`/product/${product.id}`)}
                          className="w-full text-left flex items-center gap-4 p-4 hover:bg-gray-50 transition"
                        >
                          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={
                                productImages[product.id] || defaultProductImage
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                              unoptimized={productImages[product.id] === undefined}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {product.category}
                            </p>
                          </div>
                          <p className="ml-auto text-lg font-semibold text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchModal;