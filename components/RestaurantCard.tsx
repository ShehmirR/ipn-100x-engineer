'use client';

import { useState } from 'react';
import { Restaurant } from '@/types/restaurant';
import { useAuth } from '@/contexts/AuthContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite?: boolean;
  onFavoriteChange?: () => void;
}

export default function RestaurantCard({
  restaurant,
  isFavorite = false,
  onFavoriteChange
}: RestaurantCardProps) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert('Please log in to save favorites');
      return;
    }

    setLoading(true);
    try {
      if (favorited) {
        // Remove from favorites
        const response = await fetch(
          `/api/restaurants/favorites?restaurantId=${restaurant.id}`,
          { method: 'DELETE' }
        );

        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }

        setFavorited(false);
      } else {
        // Add to favorites
        const response = await fetch('/api/restaurants/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restaurantId: restaurant.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }

        setFavorited(true);
      }

      if (onFavoriteChange) {
        onFavoriteChange();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to update favorite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span className="text-yellow-400">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '½'}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '$':
        return 'text-green-600';
      case '$$':
        return 'text-yellow-600';
      case '$$$':
        return 'text-orange-600';
      case '$$$$':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Placeholder image area */}
      <div className="h-40 bg-gradient-to-r from-red-400 to-orange-400 flex items-center justify-center">
        <span className="text-6xl">{getCuisineEmoji(restaurant.cuisine)}</span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {restaurant.name}
          </h3>
          <span className={`font-medium ml-2 ${getPriceColor(restaurant.priceRange)}`}>
            {restaurant.priceRange}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-2">{restaurant.cuisine}</p>

        <div className="flex items-center mb-2">
          {renderStars(restaurant.rating)}
          <span className="ml-2 text-sm text-gray-600">{restaurant.rating.toFixed(1)}</span>
        </div>

        <p className="text-sm text-gray-600 mb-2 truncate" title={restaurant.address}>
          📍 {restaurant.address}
        </p>

        <p className="text-sm text-gray-600 mb-2">
          🕒 {formatTime(restaurant.openingHours)} - {formatTime(restaurant.closingHours)}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2">{restaurant.description}</p>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            View Details
          </button>
          <button
            onClick={handleFavoriteToggle}
            disabled={loading}
            className={`px-3 py-2 text-sm border rounded transition-colors ${
              favorited
                ? 'bg-red-50 border-red-500 text-red-500 hover:bg-red-100'
                : 'border-gray-300 hover:bg-gray-50'
            } disabled:opacity-50`}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorited ? '❤️' : '🤍'}
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            📞
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get cuisine emoji
function getCuisineEmoji(cuisine: string): string {
  const cuisineEmojis: Record<string, string> = {
    Chinese: '🥡',
    Italian: '🍝',
    Mexican: '🌮',
    Japanese: '🍣',
    American: '🍔',
    Indian: '🍛',
    Vietnamese: '🍜',
    Mediterranean: '🥙',
    Korean: '🍲',
    French: '🥐',
    Thai: '🍜',
    Vegan: '🥗',
    Seafood: '🦐',
    Greek: '🥙',
    Ethiopian: '🍲',
    Brazilian: '🥩',
    Peruvian: '🐟',
    Spanish: '🥘',
  };

  return cuisineEmojis[cuisine] || '🍽️';
}
