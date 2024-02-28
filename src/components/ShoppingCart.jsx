import React, { useContext } from 'react';
import './ShoppingCart.scss';
import { BookContext } from '../BookContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, purchaseCart } = useContext(BookContext);

  return (
    <div>
      <div className="container"> 
        <h1 className="magic__font">Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            <p>Your Cart is Empty</p>
          </div>
        ) : (
          <div>
            <p>Total books in cart: {cartItems.reduce((total, book) => total + book.count, 0)}</p>
            <p>Total price: ${cartItems.reduce((total, book) => total + book.totalPrice, 0).toFixed(2)}</p>
            <ol className="shopping-cart-list">
              {cartItems.map((book, index) => (
                <li key={index} className="shopping-cart-item card-text d-flex justify-content-between">
                  {book.title} 
                  <span className="item-details">
                    {book.count} pc. ${(book.price * book.count).toFixed(2)}
                  <button className="btn-cart magic__font" onClick={() => removeFromCart(book)}>Remove</button>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
        <button className="btn-cart magic__font" onClick={purchaseCart} disabled={cartItems.length === 0}>Purchase</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
