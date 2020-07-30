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
        <div>
            <Link to="/signin">Sign In</Link>
        </div>
        
        
    );

    const display = currentUser ? personalGreeting() : sessionLinks();

    return (
            <nav className="nav-bar">
                <section className="nav-menu">
                    <Link to="/">
                        <img src={window.logo} alt="BluTube" className="logo"/>
                    </Link>
                </section>

                <section classname="session-btns">
                { display }
                </section>
            </nav>
    )
}