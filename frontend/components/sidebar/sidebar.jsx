import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faAngellist } from '@fortawesome/free-brands-svg-icons';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let closed = !this.props.open ? "minimized" : "";
        const sidebar = this.props.render ? (
          <div className={`sidebar ${closed}`}>
            <div className={`sidebar-top ${closed}`}>
              <div className="sidebar-link">
                <Link to="/" className={`sidebar-home ${closed}`}>
                  <FontAwesomeIcon icon={faHome} className="home-icon" />
                  <span className={`home-text ${closed}`}>Home</span>
                </Link>
              </div>
              <a href="www.linkedin.com/in/connor-j-murphy">
                <div className={`sidebar-home ${closed}`}>
                  <FontAwesomeIcon icon={faLinkedin} className="home-icon" />
                  <span className={`home-text ${closed}`}>LinkedIn</span>
                </div>
              </a>
              <a href="https://angel.co/u/connor-j-murphy">
                <div className={`sidebar-home ${closed}`}>
                  <FontAwesomeIcon icon={faAngellist} className="home-icon" />
                  <span className={`home-text ${closed}`}>AngelList</span>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <></>
        );
        return (
            <div>
                {sidebar}
            </div>
        )
    }
} 

export default Sidebar;