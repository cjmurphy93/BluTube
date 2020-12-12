import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createComment } from "../../../actions/comment_actions";
import CommentForm from "./comment_form";

const mapStateToProps = ({ session, entities: { users } }, ownProps) => ({
  currentUser: users[session.id],
  videoId: ownProps.match.params.videoId,
});

const mapDispatchToProps = (dispatch) => ({
  createComment: (comment) => dispatch(createComment(comment)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
