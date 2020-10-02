import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openSidebar, closeSidebar } from '../../actions/sidebar_actions';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import NavBar from './nav_bar';

const mapStateToProps = ({ session, entities: { users }, ui: { sidebar: { open } } }, ownProps) => {
    const render = (ownProps.location.pathname !== "/signin") && (ownProps.location.pathname !== "/signup"); 
    return {
        currentUser: users[session.id],
        render: render,
        open: open
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    openSidebar: () => dispatch(openSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    openModal: (modal) => dispatch(openModal(modal))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));