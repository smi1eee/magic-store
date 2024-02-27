import React, { createContext, useState, useEffect } from 'react';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://github.com/smi1eee/magic-store/blob/master/public/books.json')
      .then(response => response.json())
      .then(data => {
        setBooks(data.books);
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedItems);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const addToCart = (bookId, count) => {
    const selectedBook = books.find(book => book.id === parseInt(bookId));
    if (selectedBook) {
        const existingCartItem = cartItems.find(item => item.id === selectedBook.id);
        const updatedCartItems = [...cartItems];
      
      if (existingCartItem) {
        existingCartItem.count += count;
        existingCartItem.totalPrice = existingCartItem.count * parseFloat(selectedBook.price);
      } else {
        updatedCartItems.push({
          ...selectedBook,
          count,
          totalPrice: count * parseFloat(selectedBook.price)
        });
      }
      
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      window.dispatchEvent(new Event('cartUpdated'));
      console.log(`Added ${count} books to cart.`);
    }
  };

  const getBookById = (bookId) => {
    return books.find(book => book.id === parseInt(bookId));
  };
  
  const removeFromCart = (bookToRemove) => {
    const updatedItems = cartItems.filter(book => book.id !== bookToRemove.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
    window.dispatchEvent(new Event('cartUpdated'));
    console.log(`Removed ${bookToRemove.count} books from cart`);
  };

  const purchaseCart = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    window.dispatchEvent(new Event('cartUpdated'));
    console.log('Cart cleared');
  };

  return (
    <BookContext.Provider value={{ books, cartItems, addToCart, getBookById, removeFromCart, purchaseCart }}>
      {children}
    </BookContext.Provider>
  );
};
