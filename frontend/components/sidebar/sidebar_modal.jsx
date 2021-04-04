import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope, faBars } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faAngellist,
} from "@fortawesome/free-brands-svg-icons";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // let closed = !this.props.open ? "minimized" : "";
    const sidebar = this.props.render ? (
      //   <div className="modal-sidebar">
      <div className={`sidebar modal`}>
        <div className="nav-menu sidebar-modal-button">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-bars"
            onClick={this.props.closeModal}
          />
          <Link to="/" onClick={this.props.closeModal}>
            <img src={window.logo} alt="BluTube" className="logo" />
          </Link>
        </div>
        <div className={`sidebar-top modal`}>
          <div className="sidebar-link">
            <Link
              to="/"
              className={`sidebar-home modal`}
              onClick={this.props.closeModal}
            >
              <FontAwesomeIcon icon={faHome} className="home-icon" />
              <span className={`home-text modal`}>Home</span>
            </Link>
          </div>
          <a
            href="https://github.com/cjmurphy93/BluTube"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.closeModal}
          >
            <div className={`sidebar-home modal`}>
              <FontAwesomeIcon icon={faGithub} className="home-icon" />
              <span className={`home-text modal`}>GitHub</span>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/connor-j-murphy/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.closeModal}
          >
            <div className={`sidebar-home modal`}>
              <FontAwesomeIcon icon={faLinkedin} className="home-icon" />
              <span className={`home-text modal`}>LinkedIn</span>
            </div>
          </a>
          <a
            href="https://angel.co/u/connor-j-murphy"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.closeModal}
          >
            <div className={`sidebar-home modal`}>
              <FontAwesomeIcon icon={faAngellist} className="home-icon" />
              <span className={`home-text modal`}>AngelList</span>
            </div>
          </a>
          <a
            href="mailto:cjm2197@columbia.edu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={this.props.closeModal}
          >
            <div className={`sidebar-home modal`}>
              <FontAwesomeIcon icon={faEnvelope} className="home-icon" />
              <span className={`home-text modal`}>Email</span>
            </div>
          </a>
        </div>
      </div>
    ) : (
      //   </div>
      <></>
    );
    return <div>{sidebar}</div>;
  }
}

export default Sidebar;
