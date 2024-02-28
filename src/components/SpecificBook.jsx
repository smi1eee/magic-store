import React, { useState, useContext } from 'react';
import './SpecificBook.scss';
import { useParams } from 'react-router-dom';
import { BookContext } from '../BookContext'; // Імпорт контексту

const SpecificBook = () => {
  const { id } = useParams();
  const { getBookById, addToCart } = useContext(BookContext); // Отримання доступу до значення контексту
  
  const [count, setCount] = useState(1);

  const book = getBookById(id);

  const handleIncrease = () => {
    if (count < 42) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const handleInputChange = event => {
    let { value } = event.target;
    value = parseInt(value);
    if (!isNaN(value) && value >= 1 && value <= 42) {
      setCount(value);
    } else if (isNaN(value) || value < 1) {
      setCount(1);
    } else if (value > 42) {
      setCount(42);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'ArrowUp') {
      handleIncrease();
    } else if (event.key === 'ArrowDown') {
      handleDecrease();
    } else if (event.key === 'Enter') {
      handleAddToCart();
    }
  };

  
  function handleAddToCart() {
    addToCart(id, count);
  }

  const total = book ? (count * parseFloat(book.price)).toFixed(2) : 0;

  return (
    <div>
      {book ? (
        <main>
          <section className="container-fluid form__grid">
            <div id="row" className="row align-items-start flex-column flex-md-row ">
              <figure id="col-12" className="col-12 text-center col-md-4">
                <img id="card-img-top" className="card-img-top" src={book.image || 'https://raw.githubusercontent.com/smi1eee/magic-store/master/public/booksImg/imgNotFound.avif'} alt={book.title} />
              </figure>
              <div id="col-12" className="col-12 col-md-5">
                <div className="card-body text-left">
                  <h2 className="card-title">
                    {book.title}
                  </h2>
                  <div className="card-text">
                  <p>
                      <span style={{ fontWeight: 'bold' }}>Author:</span> {book.author}
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                      <span style={{ fontWeight: 'bold' }}>Short description:</span> {book.shortDescription}
                  </p>
                  <p style={{ textAlign: 'justify' }}>
                      <span style={{ fontWeight: 'bold' }}>Description:</span> {book.description}
                  </p>
                    
                  </div>
                </div>
              </div>
              <div id="col-12" className="col-12 col-md-3">
                <div className="card-text d-flex justify-content-between">
                  <p>
                    Price, $
                  </p>
                  <p>
                    {book.price}
                  </p>
                </div>
                <div className="card-text d-flex justify-content-between align-items-center">
                  <label id="label" htmlFor="count">Count:</label>
                  <button id="btn-primary" onClick={handleDecrease} className="btn btn-primary magic__font">-</button>
                  <input id="count" name="book_count" value={count} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                  <button id="btn-primary" onClick={handleIncrease} className="btn btn-primary magic__font">+</button>
                </div>
                <div className="card-text d-flex justify-content-between">
                  <p>
                    Total price, $
                  </p>
                  <p id="total-price">
                    {total}
                  </p>
                </div>
                <div className="card-text d-flex justify-content-end">
                  <button id="btn-primary" onClick={handleAddToCart} className="btn btn-primary magic__font">Add to cart</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SpecificBook;
