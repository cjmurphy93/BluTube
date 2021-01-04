import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      status: "closed",
    };

    this.handleClick = this.handleClick.bind(this);
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
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

  hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  intToRGB(i) {
    var c = (i & 0x00ffffff).toString(16).toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  render() {
    const { currentUser, status } = this.state;
    const { logout } = this.props;

    const userName =
      currentUser.first_name.trim() + currentUser.last_name.trim();
    const nameColor = this.intToRGB(this.hashCode(userName));
    const iconStyle = {
      backgroundColor: `#${nameColor}`,
    };
    const userIcon = (
      <div className="dd-user-initial" style={iconStyle}>
        <p>{userName[0]}</p>
      </div>
    );

    const userbutton = (
      <div
        className="logged-in-user-initial"
        style={iconStyle}
        onClick={this.handleClick}
      >
        <p>{userName[0]}</p>
      </div>
    );

    return (
      <div className="dropdown">
        <div className="dd-nav-btn">
          <div className="icon-button">
            {/* <FontAwesomeIcon
              icon={faUserCircle}
              className="logged-in-icon"
              onClick={this.handleClick}
            /> */}
            {userButton}
          </div>
        </div>
        <div className={`dropdown-menu ${status}`}>
          <div className="dropdown-top">
            {/* <FontAwesomeIcon icon={faUserCircle} className="dropdown-uc" /> */}
            {userIcon}
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
