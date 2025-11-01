'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '@/context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = () => {
  const { isAuthModalOpen, authModalView, closeAuthModal } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = isAuthModalOpen ? 'hidden' : 'auto';
  }, [isAuthModalOpen]);

  if (!isClient || !isAuthModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-labelledby="auth-modal-title"
      role="dialog"
      aria-modal="true"
    >
      
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-2xl m-4">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {authModalView === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;