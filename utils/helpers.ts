/**
 * Utility helper functions
 *
 * TODO: Workshop Exercise 2 - Find and remove dead code
 * Several functions in this file are unused and should be removed
 */

// This function is actually used
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

// UNUSED: This function was planned but never implemented in the UI
export function formatPhoneNumber(phone: string): string {
  console.log('Formatting phone number:', phone); // Dead code - should be removed
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  return phone;
}

// UNUSED: This function was for a feature that was never completed
export function getRestaurantStatus(openingHours: string, closingHours: string): {
  isOpen: boolean;
  statusText: string;
  statusColor: string;
} {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  console.log('Checking status for time:', currentTime); // Dead code

  const isOpen = currentTime >= openingHours && currentTime <= closingHours;

  return {
    isOpen,
    statusText: isOpen ? 'Open Now' : 'Closed',
    statusColor: isOpen ? 'text-green-600' : 'text-red-600',
  };
}

// UNUSED: Legacy sorting function
export function sortRestaurantsByRating(restaurants: any[]): any[] {
  console.log('Sorting restaurants by rating'); // Dead code
  return [...restaurants].sort((a, b) => b.rating - a.rating);
}

// UNUSED: Legacy sorting function
export function sortRestaurantsByName(restaurants: any[]): any[] {
  console.log('Sorting restaurants by name'); // Dead code
  return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
}

// UNUSED: Filter function that was never implemented
export function filterByCuisine(restaurants: any[], cuisine: string): any[] {
  console.log('Filtering by cuisine:', cuisine); // Dead code
  return restaurants.filter((r) => r.cuisine.toLowerCase() === cuisine.toLowerCase());
}

// UNUSED: Filter function for price range
export function filterByPriceRange(restaurants: any[], priceRange: string): any[] {
  console.log('Filtering by price range:', priceRange); // Dead code
  return restaurants.filter((r) => r.priceRange === priceRange);
}

// UNUSED: Validation function
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// UNUSED: Debug helper
export function logRestaurantDetails(restaurant: any): void {
  console.log('=== Restaurant Details ===');
  console.log('Name:', restaurant.name);
  console.log('Address:', restaurant.address);
  console.log('Cuisine:', restaurant.cuisine);
  console.log('Rating:', restaurant.rating);
  console.log('========================');
}

// UNUSED: Truncate text helper
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// UNUSED: Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// UNUSED: Deep clone object
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// UNUSED: Debounce function (was planned for search input)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
