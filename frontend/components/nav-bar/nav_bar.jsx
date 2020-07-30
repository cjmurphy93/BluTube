import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';


export default ({ currentUser, logout, render }) => {
    const personalGreeting = () => (
        <div>
            <h3>Welcome {currentUser.first_name}</h3>
            <button onClick={logout}>Logout</button>
        </div>
    );

    const sessionLinks = () => (
        <div className="signin-btn">
            <Link to="/signin" className="signin-link">
                <FontAwesomeIcon icon={ faUserCircle } className="user-circle" />
                <p className="signin-text">Sign In</p></Link>
        </div>
        
        
    );

    const rightSide = currentUser ? personalGreeting() : sessionLinks();

    const bar = () => (
        <header>
        <nav className="nav-bar">
            <section className="nav-menu">
                <FontAwesomeIcon icon={faBars} className="menu-bars" />
                <Link to="/">
                    <img src={window.logo} alt="BluTube" className="logo" />
                </Link>
            </section>

            <section className="session-btns">
                {rightSide}
            </section>
        </nav>
        </header>
    )

    const display = render ? bar() : null;

    return (
        <>
            {display}
        </>
        
    )
}