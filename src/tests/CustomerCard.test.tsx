import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerCard from '../components/CustomerCard';

const mockCustomer = {
  id: '1',
  name: 'Иван Иванов',
  phone: '+375 29 123-45-67',
  order: 'Органические овощи: морковь 2кг, картофель 5кг',
  status: 'Новый' as const,
  createdAt: '2024-01-01T10:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z'
};

const mockOnStatusChange = jest.fn();

describe('CustomerCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders customer information correctly', () => {
    render(
      <CustomerCard 
        customer={mockCustomer} 
        onStatusChange={mockOnStatusChange} 
      />
    );

    expect(screen.getByText('Иван Иванов')).toBeInTheDocument();
    expect(screen.getByText('+375 29 123-45-67')).toBeInTheDocument();
    expect(screen.getByText(/Органические овощи/)).toBeInTheDocument();
    expect(screen.getByText('🆕 Новый')).toBeInTheDocument();
  });

  it('calls onStatusChange when status is changed', () => {
    render(
      <CustomerCard 
        customer={mockCustomer} 
        onStatusChange={mockOnStatusChange} 
      />
    );

    const statusSelect = screen.getByDisplayValue('Новый');
    fireEvent.change(statusSelect, { target: { value: 'Собирается' } });

    expect(mockOnStatusChange).toHaveBeenCalledWith('1', 'Собирается');
  });

  it('displays correct status badge for different statuses', () => {
    const processingCustomer = { ...mockCustomer, status: 'Собирается' as const };
    
    render(
      <CustomerCard 
        customer={processingCustomer} 
        onStatusChange={mockOnStatusChange} 
      />
    );

    expect(screen.getByText('📦 Собирается')).toBeInTheDocument();
  });
}); 