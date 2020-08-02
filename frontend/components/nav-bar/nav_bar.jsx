import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';


export default ({ currentUser, logout, render }) => {
    const personalGreeting = () => (
        <Dropdown 
        currentUser={currentUser}
        logout={logout}
        />
    );

    const sessionLinks = () => (
        <div className="signin-btn">
            <Link to="/signin" className="signin-link">
                <FontAwesomeIcon icon={ faUserCircle } className="user-circle" />
                <p className="signin-btn-text">Sign In</p></Link>
        </div>
        
        
    );

    const sessionButtons = currentUser ? personalGreeting() : sessionLinks();

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
                {sessionButtons}
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