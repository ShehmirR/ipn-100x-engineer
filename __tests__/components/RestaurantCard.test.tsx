/**
 * TODO: Workshop Exercise 4 - Add unit tests
 *
 * This test file is a skeleton for RestaurantCard component tests.
 * Add meaningful tests for:
 * - Rendering restaurant information
 * - Star rating display
 * - Price range display
 * - Button functionality
 */

import { render, screen } from '@testing-library/react';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/types/restaurant';

const mockRestaurant: Restaurant = {
  id: '1',
  name: 'Test Restaurant',
  address: '123 Test Street, Test City, CA 12345',
  cuisine: 'Italian',
  rating: 4.5,
  priceRange: '$$',
  openingHours: '11:00',
  closingHours: '22:00',
  latitude: 37.7749,
  longitude: -122.4194,
  phone: '(555) 123-4567',
  description: 'A test restaurant for unit testing',
};

describe('RestaurantCard', () => {
  it('renders restaurant name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
  });

  it('displays the cuisine type', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('Italian')).toBeInTheDocument();
  });

  it('shows the rating', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  // TODO: Add more tests
  // - Test price range display and colors
  // - Test star rendering for different ratings
  // - Test address truncation
  // - Test View Details button
  // - Test phone button
});
