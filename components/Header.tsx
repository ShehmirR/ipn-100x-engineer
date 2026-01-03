'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function Header() {
  const { user, logout, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const openLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <h1 className="text-3xl font-bold text-gray-900 cursor-pointer hover:text-red-500 transition-colors">
                  🍽️ Restaurant Finder
                </h1>
              </Link>
              <p className="mt-1 text-sm text-gray-500">
                Find the best restaurants near you
              </p>
            </div>

            {/* Auth section */}
            <div className="flex items-center gap-4">
              {loading ? (
                <div className="text-gray-400">Loading...</div>
              ) : user ? (
                <>
                  <Link
                    href="/favorites"
                    className="text-gray-700 hover:text-red-500 transition-colors font-medium"
                  >
                    ❤️ Favorites
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={openLogin}
                    className="px-4 py-2 text-gray-700 hover:text-red-500 transition-colors font-medium"
                  >
                    Log in
                  </button>
                  <button
                    onClick={openSignup}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
}
