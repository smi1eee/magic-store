import React, { useState, useContext } from 'react';
import './BookList.scss';
import { Link } from 'react-router-dom';
import { BookContext } from '../BookContext';

function BookList() {
    const { books } = useContext(BookContext);
    const [searchText, setSearchText] = useState('');
    const [priceFilter, setPriceFilter] = useState('All');

    const handleSearchInputChange = event => {
        setSearchText(event.target.value);
    };

    const handlePriceFilterChange = event => {
        setPriceFilter(event.target.value);
    };

    const filteredBooks = books.filter(book => {
        return (
            book.title.toLowerCase().includes(searchText.toLowerCase()) &&
            (priceFilter === 'All' ||
                (priceFilter === '0-15' && book.price > 0 && book.price < 15) ||
                (priceFilter === '15-30' && book.price >= 15 && book.price < 30) ||
                (priceFilter === '30+' && book.price >= 30))
        );
    });

    const cutTitle = title => {
        if (title.length > 24) {
            return title.substring(0, 24) + '...';
        }
        return title;
    };

    return (
        <div>
            <main>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Search by book title"
                    value={searchText}
                    onChange={handleSearchInputChange}
                    id="searchField"
                />           
                <select value={priceFilter} onChange={handlePriceFilterChange} id="priceFilter">
                    <option value="All">All</option>
                    <option value="0-15">$ 0 - 15</option>
                    <option value="15-30">$ 15 - 30</option>
                    <option value="30+">$ 30+</option>
                </select>
            </div>
                <section className="container-fluid form__grid">
                    <div className="row align-items-start justify-content-center" id="bookListContainer">
                        {filteredBooks.map(book => (
                            <div key={book.id} className="col-md-3 col-sm-4 col-xs-6 mb-5">
                                <div className="card mx-auto">
                                    <Link to={`/book/${book.id}`} state={{ book }}>
                                        <img src={book.image || 'https://raw.githubusercontent.com/smi1eee/magic-store/master/public/booksImg/imgNotFound.avif'} className="card-img-top" alt={book.title} />
                                    </Link>
                                    <div className="card-body text-left">
                                        <h5 className="book-title">{cutTitle(book.title)}</h5>
                                        <p className="book-author">{book.author}</p>
                                        <div className="d-flex justify-content-between align-items-center w-100">
                                            <p className="book-price mb-0">{book.price}</p>
                                            <Link to={`/book/${book.id}`} state={{ book }} className="btn btn-primary">View</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

export default BookList;
