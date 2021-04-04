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
    this.hashCode = this.hashCode.bind(this);
    this.intToRGB = this.intToRGB.bind(this);
    this._editClick = this._editClick.bind(this);
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

  _editClick(e) {
    e.preventDefault();
    const { status } = this.state;
    if (status === "closed") {
      this.setState({ status: "open" });
    } else {
      this.setState({ status: "closed" });
    }
    if (this.props.currentUser) {
      this.props.history.push(`/users/${this.props.currentUser.id}/edit`);
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
      color: `#${nameColor}`,
    };
    // const iconStyle = {
    //   backgroundColor: `#${nameColor}`,
    // };
    // const userIcon = (
    //   <div className="dd-user-initial" style={iconStyle}>
    //     <p>{userName[0]}</p>
    //   </div>
    // );

    // const userButton = (
    //   <div
    //     className="logged-in-user-initial"
    //     style={iconStyle}
    //     onClick={this.handleClick}
    //   >
    //     <p>{userName[0]}</p>
    //   </div>
    // );

    const ddNavBtn = this.props.currentUser.profilePicUrl ? (
      <div className="dd-nav-btn">
        <div className="pic-icon-button">
          <img
            src={this.props.currentUser.profilePicUrl}
            className="dd-pro-pic-nav"
            onClick={this.handleClick}
          />
          {/* {userButton} */}
        </div>
      </div>
    ) : (
      <div className="dd-nav-btn">
        <div className="icon-button">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="logged-in-icon"
            onClick={this.handleClick}
            style={iconStyle}
          />
          {/* {userButton} */}
        </div>
      </div>
    );

    const ddTopPic = this.props.currentUser.profilePicUrl ? (
      <div className="dd-pro-pic-top">
        <img
          src={this.props.currentUser.profilePicUrl}
          className="dd-pro-pic"
          onClick={this.handleClick}
        />
      </div>
    ) : (
      <FontAwesomeIcon
        icon={faUserCircle}
        className="dropdown-uc"
        style={iconStyle}
      />
    );

    return (
      <div className="dropdown">
        {ddNavBtn}
        <div className={`dropdown-menu ${status}`}>
          <div className="dropdown-top">
            {ddTopPic}
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
              <li onClick={this._editClick} className="dd-option">
                <div className="list-sign-out">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="signout-icon"
                  />
                  <span className="so-text">Edit Profile</span>
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
