import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      status: "closed",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const { status } = this.state;
    if (status === "closed") {
      this.setState({ status: "open" });
    } else {
      this.setState({ status: "closed" });
    }
  }

  render() {
    const { currentUser, status } = this.state;
    const { logout } = this.props;

    return (
      <div className="dropdown">
        <div className="dd-nav-btn">
          <div className="icon-button">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="logged-in-icon"
              onClick={this.handleClick}
            />
          </div>
        </div>
        <div className={`dropdown-menu ${status}`}>
          <div className="dropdown-top">
            <FontAwesomeIcon icon={faUserCircle} className="dropdown-uc" />
            <div className="dropdown-details">
              <p className="dropdown-name">
                {currentUser.first_name} {currentUser.last_name}
              </p>
              <p className="dropdown-email">{currentUser.email}</p>
            </div>
          </div>
          <div className="dropdown-options">
            <ul className="dd-option-list">
              <li onClick={logout} className="dd-option">
                <div className="list-sign-out">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="signout-icon"
                  />
                  <span className="so-text">Sign out</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdown;
