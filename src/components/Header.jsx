import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import Avatar from './avatar.png';
import Cart from './cart.svg';


function Header({ setUsername }) {
    const location = useLocation();
    const [itemCount, setItemCount] = useState(0);
    const username = localStorage.getItem('username');

    const handleSignOut = () => {
        localStorage.removeItem('username');
        setUsername('');
    };

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemCount = storedCartItems.reduce((total, book) => total + book.count, 0);
        setItemCount(itemCount);

        const handleCartUpdated = () => {
            const updatedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const updatedItemCount = updatedCartItems.reduce((total, book) => total + book.count, 0);
            setItemCount(updatedItemCount);
        };

        window.addEventListener('cartUpdated', handleCartUpdated);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdated);
        };
    }, []);

    if (location.pathname === '/sign') {
        return (
            <header className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                    <Link className="navbar-brand mr-2" to="/">STORE of MAGIC</Link>
                        <div className="navbar-text">| Oleksandr Tkachenko</div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link className="navbar-brand mr-2" to="/">STORE of MAGIC</Link>
                    <div className="navbar-text">| Oleksandr Tkachenko</div>
                </div>
                <div className="ml-auto d-flex align-items-center">
                    <Link to="/cart" className="d-flex align-items-center">
                        <div className="position-relative">
                            <img src={Cart} width="50px" alt="Cart" className="mr-2" />
                            {itemCount > 0 && <span className="badge badge-pill badge-primary cart-badge">{itemCount}</span>}
                        </div>
                    </Link>
                    <Link to="/" onClick={handleSignOut} className="btn btn-primary magic__font">Sign-out</Link>
                    <img src={Avatar} alt="Avatar" className="rounded-circle ml-2" width="50" height="50" />
                    <p className="username ml-2 mb-0 ">{username}</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
