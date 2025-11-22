/**
 * TODO: Workshop Exercise 4 - Add unit tests
 *
 * This test file is a skeleton for distance utility tests.
 * Add meaningful tests for:
 * - calculateDistance function
 * - formatDistance function
 * - mockGeocode function
 */

import { calculateDistance, formatDistance, mockGeocode } from '@/utils/distance';

describe('Distance Utilities', () => {
  describe('calculateDistance', () => {
    it('calculates distance between two points correctly', () => {
      // San Francisco to Los Angeles is approximately 559 km
      const distance = calculateDistance(37.7749, -122.4194, 34.0522, -118.2437);
      expect(distance).toBeGreaterThan(550);
      expect(distance).toBeLessThan(570);
    });

    it('returns 0 for the same point', () => {
      const distance = calculateDistance(37.7749, -122.4194, 37.7749, -122.4194);
      expect(distance).toBe(0);
    });

    // TODO: Add more tests
    // - Test with different coordinate pairs
    // - Test edge cases (international date line, poles)
  });

  describe('formatDistance', () => {
    it('formats distances under 1km in meters', () => {
      expect(formatDistance(0.5)).toBe('500m');
    });

    it('formats distances over 1km in kilometers', () => {
      expect(formatDistance(5.5)).toBe('5.5 km');
    });

    // TODO: Add more tests
  });

  describe('mockGeocode', () => {
    it('returns coordinates for San Francisco', () => {
      const result = mockGeocode('San Francisco');
      expect(result).toEqual({
        latitude: 37.7749,
        longitude: -122.4194,
      });
    });

    it('returns default coordinates for unknown locations', () => {
      const result = mockGeocode('Unknown City XYZ');
      expect(result).toEqual({
        latitude: 37.7749,
        longitude: -122.4194,
      });
    });

    // TODO: Add more tests
    // - Test zip codes
    // - Test neighborhood names
    // - Test case insensitivity
  });
});
