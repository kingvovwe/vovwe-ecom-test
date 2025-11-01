'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/context/AuthContext';
import { useCartStore } from '@/context/CartContext';
import { User, LogOut, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { itemCount, openCartModal } = useCartStore((state) => ({
    itemCount: state.getItemCount(),
    openCartModal: state.openCartModal,
  }));
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  const handleLogout = () => {
    setIsOpen(false);
    logout();
    toast.success('Signed out successfully.');
  };

  const handleCartClick = () => {
    setIsOpen(false);
    openCartModal();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Open user menu"
      >
        <User size={20} className="text-gray-700" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-2">
            <button
              onClick={handleCartClick}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} />
                <span>My Cart</span>
              </div>
              {itemCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-900 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;