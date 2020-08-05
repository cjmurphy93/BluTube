import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        let closed = !this.props.open ? "closed" : "";
        const sidebar = this.props.render ? (
            <div className={`sidebar ${closed}`}>
                <div className={`sidebar-top ${closed}`}>
                    <Link to="/" className={`sidebar-home ${closed}`} >
                        <FontAwesomeIcon icon={faHome} className="home-icon" />
                        <span className={`home-text ${closed}`}>Home</span>
                    </Link>
                </div>
            </div>
        ) : (
            <></>
        )
        return (
            <div>
                {sidebar}
            </div>
        )
    }
} 

export default Sidebar;