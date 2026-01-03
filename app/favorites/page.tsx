'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types/restaurant';
import restaurantData from '@/data/restaurants.json';

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to home if not logged in (after auth check completes)
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch user's favorite IDs
      const response = await fetch('/api/restaurants/favorites');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch favorites');
      }

      const favoriteIds = data.favorites;

      // Filter restaurant data to get only favorites
      const favorites = restaurantData.restaurants.filter((restaurant: Restaurant) =>
        favoriteIds.includes(restaurant.id)
      );

      setFavoriteRestaurants(favorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  // Don't render if not logged in (will redirect)
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Favorite Restaurants</h1>
          <p className="mt-2 text-gray-600">
            All the restaurants you have saved for later
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            <span className="ml-3 text-gray-600">Loading your favorites...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && favoriteRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start exploring and save your favorite restaurants
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Discover Restaurants
            </button>
          </div>
        )}

        {/* Favorites Grid */}
        {!loading && favoriteRestaurants.length > 0 && (
          <div>
            <p className="text-gray-600 mb-4">
              {favoriteRestaurants.length} {favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'}
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favoriteRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isFavorite={true}
                  onFavoriteChange={loadFavorites}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Restaurant Finder - AI Workshop Demo Application
          </p>
        </div>
      </footer>
    </main>
  );
}
