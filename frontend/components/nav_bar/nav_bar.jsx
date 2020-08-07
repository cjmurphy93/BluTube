import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle, faVideo } from '@fortawesome/free-solid-svg-icons';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(e)  {
        e.preventDefault();
        this.props.open ? this.props.closeSidebar() : this.props.openSidebar();
    }

 render() {

    const { currentUser, logout, render } = this.props;
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
                <FontAwesomeIcon icon={faBars} className="menu-bars" onClick={this.toggleSidebar}/>
                <Link to="/">
                    <img src={window.logo} alt="BluTube" className="logo" />
                </Link>
            </section>

            <section className="session-btns">
                    <Link to="/user/videos">

                <FontAwesomeIcon icon={faVideo} className="create-video-button" />
                    </Link>
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
};

export default NavBar;