import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
    let closed = !this.props.open ? "minimized" : "";
    const sidebar = this.props.render ? (
      <div className={`sidebar main ${closed}`}>
        <div className={`sidebar-top main ${closed}`}>
          <div className="sidebar-link">
            <Link to="/" className={`sidebar-home main ${closed}`}>
              <FontAwesomeIcon icon={faHome} className="home-icon" />
              <span className={`home-text main ${closed}`}>Home</span>
            </Link>
          </div>
          <a
            href="https://github.com/cjmurphy93/BluTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`sidebar-home main ${closed}`}>
              <FontAwesomeIcon icon={faGithub} className="home-icon" />
              <span className={`home-text main ${closed}`}>GitHub</span>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/connor-j-murphy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`sidebar-home main ${closed}`}>
              <FontAwesomeIcon icon={faLinkedin} className="home-icon" />
              <span className={`home-text main ${closed}`}>LinkedIn</span>
            </div>
          </a>
          <a
            href="https://angel.co/u/connor-j-murphy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`sidebar-home main ${closed}`}>
              <FontAwesomeIcon icon={faAngellist} className="home-icon" />
              <span className={`home-text main ${closed}`}>AngelList</span>
            </div>
          </a>
          <a
            href="mailto:cjm2197@columbia.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`sidebar-home main ${closed}`}>
              <FontAwesomeIcon icon={faEnvelope} className="home-icon" />
              <span className={`home-text main ${closed}`}>Email</span>
            </div>
          </a>
        </div>
      </div>
    ) : (
      <></>
    );
    return <div>{sidebar}</div>;
  }
}

export default Sidebar;
