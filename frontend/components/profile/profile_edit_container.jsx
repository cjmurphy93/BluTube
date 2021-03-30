import { connect } from "react-redux";
import { fetchUser, updateUser } from "../../actions/user_actions";
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
