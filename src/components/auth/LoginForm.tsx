'use client';

import { useState } from 'react';
import { useAuthStore } from '@/context/AuthContext';
import { loginUser } from '@/services/api';
import toast from 'react-hot-toast';
import Button from '@/components/shared/Button';

const LoginForm = () => {
  const { setAuth, setAuthModalView } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Signing in...');

    const response = await loginUser({ email, password });

    if ('error' in response) {
      toast.error(response.error, { id: toastId });
      setIsLoading(false);
    } else {
      toast.success('Signed in successfully!', { id: toastId });
      setAuth(response.token, response.user);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-gray-900">Sign In</h3>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-3 border"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900 sm:text-sm p-3 border"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full py-3"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      <p className="text-sm text-center text-gray-600">
        No account?{' '}
        <button
          type="button"
          onClick={() => setAuthModalView('register')}
          className="font-medium text-gray-900 hover:underline"
        >
          Register here
        </button>
      </p>
    </form>
  );
};

export default LoginForm;