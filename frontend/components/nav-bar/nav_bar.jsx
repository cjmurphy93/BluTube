import React from 'react';
import { Link } from 'react-router-dom';


export default ({ currentUser, logout }) => {
    const personalGreeting = () => (
        <div>
            <h3>Welcome {currentUser.first_name}</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );

    const sessionLinks = () => (
        <nav>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
        </nav>
    );

    const display = currentUser ? personalGreeting() : sessionLinks();

    return (
            <div>
                { display }
            </div>
    )
}