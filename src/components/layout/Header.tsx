'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  List,
  ChevronDown,
} from 'lucide-react';

import { useCartStore } from '@/context/CartContext';
import { useAuthStore } from '@/context/AuthContext';
import { useUIStore } from '@/context/UIContext';
import { getCategories } from '@/services/api';
import { Category } from '@/types';

import CategoriesDropdown from './CategoriesDropdown';
import ProfileDropdown from './ProfileDropdown';
import toast from 'react-hot-toast';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // --- STATE FOR MOBILE CATEGORIES ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  const { itemCount, openCartModal } = useCartStore((state) => ({
    itemCount: state.getItemCount(),
    openCartModal: state.openCartModal,
  }));
  const { user, openAuthModal, logout } = useAuthStore();
  const { openSearchModal } = useUIStore();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  // --- FETCH CATEGORIES FOR MOBILE MENU ---
  useEffect(() => {
    setIsClient(true);
    async function loadCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    loadCategories();
  }, []);

  // Reusable NavLink component for mobile menu
  const NavLink = ({
    href,
    children,
    icon,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
  }) => (
    <Link
      href={href}
      className="flex items-center gap-4 text-base font-medium text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition-colors"
      onClick={onClick}
    >
      {icon}
      {children}
    </Link>
  );

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openAuthModal('login');
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    toast.success('Signed out successfully.');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between h-20 px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        
        <div className="flex-1 flex items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Vovwe</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 uppercase">
              VOVWE
            </span>
            <span className="text-sm font-light tracking-tight text-gray-900 uppercase">
              {' '}
              ECCOMMERCE
            </span>
          </Link>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-6 lg:gap-8">
          
          <button
            onClick={openSearchModal}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Search size={20} />
            Search
          </button>
          <CategoriesDropdown />
          <Link
            href="#"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Heart size={20} />
            Wishlist
          </Link>
          {/* --- CART --- */}
          <button
            onClick={openCartModal}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors relative"
          >
            <ShoppingBag size={20} />
            <span>Cart</span>
            {isClient && itemCount > 0 && (
              <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-900 rounded-full">
                {itemCount}
              </span>
            )}
          </button>

          {/* --- Auth --- */}
          {isClient && user ? (
            <ProfileDropdown />
          ) : (
            <button
              onClick={handleSignInClick}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User size={20} />
              Sign in
            </button>
          )}

          
        </div>

        {/* --- MOBILE ICONS --- */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={openSearchModal}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
          >
            <span className="sr-only">Search</span>
            <Search size={20} />
          </button>
          {/* --- MOBILE CART --- */}
          <button
            onClick={openCartModal}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 relative"
          >
            <span className="sr-only">Cart</span>
            <ShoppingBag size={20} />
            {isClient && itemCount > 0 && (
              <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gray-900 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu size={25} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-white"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-gray-200">
            <Link href="/" className="-m-1.5 p-1.2" onClick={closeMobileMenu}>
              <span className="text-xl font-bold tracking-tight text-gray-900 uppercase">VOVWE</span>
              <span className="text-sm font-light tracking-tight text-gray-900 uppercase"> ECCOMMERCE</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X size={24} />
            </button>
          </div>
          
          {/* Menu Content */}
          <div className="h-[calc(100vh-5rem)] flex flex-col justify-between p-4 sm:p-6">
            
            <div className="space-y-2">
              
              <button
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:bg-gray-100 p-3 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <List size={20} />
                  <span>Categories</span>
                </div>
                <ChevronDown size={16} className={`transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMobileCategoryOpen && (
                <div className="pl-12 pr-4 space-y-1 py-2">
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="block w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    All Products
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/?category=${category}`}
                      onClick={closeMobileMenu}
                      className="block w-full text-left py-2 text-sm text-gray-600 hover:text-gray-900 capitalize"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
              

              <NavLink href="#" icon={<Heart size={20} />} onClick={closeMobileMenu}>
                Wishlist
              </NavLink>
            </div>


            <div className="border-t border-gray-200 pt-4 space-y-2">
              {isClient && user ? (
                <>
                  <div className="flex items-center gap-3 p-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      <User size={20} className="text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      handleLogoutClick(e);
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center gap-4 text-base font-medium text-red-600 hover:bg-gray-100 p-3 rounded-lg transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <NavLink
                  href="#"
                  icon={<User size={20} />}
                  onClick={(e) => {
                    handleSignInClick(e);
                    closeMobileMenu();
                  }}
                >
                  Sign in / Register
                </NavLink>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;