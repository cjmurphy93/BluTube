import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";
import SearchBar from "../search/search_bar/search_bar_container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUserCircle,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this._loginClick = this._loginClick.bind(this);
  }

  _loginClick(e) {
    this.props.history.push("/signin");
  }

  toggleSidebar(e) {
    e.preventDefault();

    if (window.innerWidth > 1328 && !this.props.sidebarModalRender) {
      this.props.open ? this.props.closeSidebar() : this.props.openSidebar();
    } else {
      this.props.modal
        ? this.props.closeSidebar()
        : this.props.openModal("sidebar");
    }
  }

  render() {
    const { currentUser, logout, render, openModal } = this.props;
    const personalGreeting = () => (
      <Dropdown
        currentUser={currentUser}
        logout={logout}
        history={this.props.history}
      />
    );

    const sessionLinks = () => (
      <div className="signin-btn">
        <Link to="/signin" className="signin-link">
          <FontAwesomeIcon icon={faUserCircle} className="sb-user-circle" />
          <p className="signin-btn-text">Sign In</p>
        </Link>
      </div>
    );

    const sessionButtons = currentUser ? personalGreeting() : sessionLinks();

    const bar = () => (
      <header>
        <nav className="nav-bar">
          <section className="nav-menu">
            <FontAwesomeIcon
              icon={faBars}
              className="menu-bars"
              onClick={this.toggleSidebar}
            />
            <Link to="/">
              <img src={window.logo} alt="BluTube" className="logo" />
            </Link>
          </section>

          <section className="nav-search-bar">
            <SearchBar />
          </section>

          <section className="session-btns">
            <div className="create-video-button">
              <FontAwesomeIcon
                onClick={() =>
                  currentUser ? openModal("createVideo") : this._loginClick()
                }
                icon={faVideo}
              />
            </div>

            {sessionButtons}
          </section>
        </nav>
      </header>
    );

    const display = render ? bar() : null;

    return <>{display}</>;
  }
}

export default NavBar;
