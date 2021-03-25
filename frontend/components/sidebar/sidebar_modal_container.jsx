import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SidebarModal from "./sidebar_modal";

const mapStateToProps = (state, ownProps) => {
  const render =
    (ownProps.location.pathname !== "/signin" &&
      ownProps.location.pathname !== "/signup") ||
    //   ownProps.location.pathname !== "/signup" &&
    //   !(
    // ownProps.location.pathname.startsWith("/videos") &&
    // !ownProps.location.pathname.endsWith("edit")
    //   )) ||
    ownProps.location.pathname.startsWith("/videos/search");
  return {
    currentUser: state.entities.users[state.session.id],
    open: state.ui.sidebar.open,
    render,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidebarModal)
);
