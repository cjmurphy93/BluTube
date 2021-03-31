import { connect } from "react-redux";
import { fetchUser, updateUser, fetchUsers } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import ProfileEdit from "./profile_edit";

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user, id) => dispatch(updateUser(user, id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
);
