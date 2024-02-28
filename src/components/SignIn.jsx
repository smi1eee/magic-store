import React, { useState } from 'react';
import './SignIn.scss';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import avatar from './avatar.png';
import bookstoreIcon from './bookstore-icon.png';

function SignIn() {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        if (/^[A-Za-z0-9]{0,17}$/.test(value)) {
            setUsername(value);
            setError('');
        } else {
            setError('Username must be 4-16 characters long and contain only Latin letters and numbers.');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (username.length >= 4 && username.length <= 16 && /^[A-Za-z0-9]{4,16}$/.test(username)) {
            localStorage.setItem('username', username);
            navigate('/');
        } else {
            setError('Username must be 4-16 characters long and contain only Latin letters and numbers.');
        }
    };

    
    return (
        <div>
            <Helmet>
                <title>Book Shop</title>
                <link rel="icon" href={bookstoreIcon} />
            </Helmet>

            <main className="si-main-container text-center mx-auto">
                <div className="si-card mx-auto">
                    <img className="si-avatar-img d-block mx-auto" src={avatar} alt="user avatar" />
                    <form className="si-form" onSubmit={handleSubmit}>
                        <div>
                            <label className="magic__font" htmlFor="name">U S E R N A M E</label><br />
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                autoComplete="username"
                                required
                                placeholder="Enter your username"
                                title="only latin letters and numbers are available, 4-16 characters"
                                value={username}
                                onChange={handleChange}
                            />
                            
                        </div>
                        <Link to="/">
                            <button className="si-btn magic__font" type="submit" disabled={username.length < 4 || username.length > 16} onClick={handleSubmit}>Sign-in</button>
                        </Link>
                        {error && <p className="si-error">{error}</p>}
                    </form>
                </div>
            </main>

        </div>
    );
}

export default SignIn;
