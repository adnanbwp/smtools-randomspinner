import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SpinWheel from '../SpinWheel';

// Mock react-spring
jest.mock('react-spring', () => ({
  useSpring: () => ({ transform: 'rotate(0deg)' }),
  animated: {
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
  },
}));

describe('SpinWheel Component', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3'];
  const mockOnSpinComplete = jest.fn();

  it('renders without crashing', () => {
    render(<SpinWheel items={mockItems} onSpinComplete={mockOnSpinComplete} />);
    expect(screen.getByText('Spin')).toBeInTheDocument();
  });

  it('displays all items', () => {
    render(<SpinWheel items={mockItems} onSpinComplete={mockOnSpinComplete} />);
    mockItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('disables spin button when spinning', () => {
    render(<SpinWheel items={mockItems} onSpinComplete={mockOnSpinComplete} />);
    const spinButton = screen.getByText('Spin');
    fireEvent.click(spinButton);
    expect(spinButton).toBeDisabled();
    expect(spinButton).toHaveTextContent('Spinning...');
  });

  it('disables spin button when no items are loaded', () => {
    render(<SpinWheel items={[]} onSpinComplete={mockOnSpinComplete} />);
    const spinButton = screen.getByText('Spin');
    expect(spinButton).toBeDisabled();
  });
});