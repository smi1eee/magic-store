import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SpecificBook from '../components/SpecificBook';
import { BookContext } from '../components/BookContext';

const mockBook = {
  id: '1',
  title: 'Test Book',
  author: 'Test Author',
  shortDescription: 'Test Short Description',
  description: 'Test Description',
  price: '10.00',
  image: 'test.jpg'
};

const mockBookContextValue = {
  getBookById: jest.fn().mockReturnValue(mockBook),
  addToCart: jest.fn()
};

describe('SpecificBook', () => {
  it('increments count when + button is clicked', () => {
    render(
      <Router>
        <BookContext.Provider value={mockBookContextValue}>
          <SpecificBook />
        </BookContext.Provider>
      </Router>
    );

    const increaseButton = screen.getByText('+');
    fireEvent.click(increaseButton);

    const countInput = screen.getByDisplayValue('2');
    expect(countInput).toBeTruthy();
  });

  it('decrements count when - button is clicked', () => {
    render(
      <Router>
        <BookContext.Provider value={mockBookContextValue}>
          <SpecificBook />
        </BookContext.Provider>
      </Router>
    );

    const decreaseButton = screen.getByText('-');
    fireEvent.click(decreaseButton);

    const countInput = screen.getByDisplayValue('1');
    expect(countInput).toBeTruthy();
  });

  it('updates total price when count is changed', () => {
    render(
      <Router>
        <BookContext.Provider value={mockBookContextValue}>
          <SpecificBook />
        </BookContext.Provider>
      </Router>
    );

    const countInput = screen.getByDisplayValue('1');
    fireEvent.change(countInput, { target: { value: '3' } });

    const totalPrice = screen.getByText('30.00');
    expect(totalPrice).toBeTruthy();
  });
});
