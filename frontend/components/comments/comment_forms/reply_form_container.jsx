import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createReply } from "../../../actions/comment_actions";
import ReplyForm from "./reply_form";

const mapStateToProps = ({ session, entities: { users } }, ownProps) => ({
  currentUser: users[session.id],
  videoId: ownProps.match.params.videoId,
  formType: "reply",
});

const mapDispatchToProps = (dispatch) => ({
  createReply: (comment) => dispatch(createReply(comment)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReplyForm)
);
