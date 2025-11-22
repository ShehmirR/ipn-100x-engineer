/**
 * TODO: Workshop Exercise 4 - Add unit tests
 *
 * This test file is a skeleton for SearchForm component tests.
 * Add meaningful tests for:
 * - Form rendering
 * - Input handling
 * - Form submission
 * - Loading state
 * - Validation
 */

import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '@/components/SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the search form', () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);
    expect(screen.getByLabelText(/enter your location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /find restaurants/i })).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with valid input', () => {
    render(<SearchForm onSearch={mockOnSearch} isLoading={false} />);

    const input = screen.getByPlaceholderText(/enter address/i);
    const button = screen.getByRole('button', { name: /find restaurants/i });

    fireEvent.change(input, { target: { value: 'San Francisco' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('San Francisco');
  });

  // TODO: Add more tests
  // - Test that button is disabled when input is empty
  // - Test that button is disabled when loading
  // - Test that loading text is displayed when isLoading is true
  // - Test form validation
});
