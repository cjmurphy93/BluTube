import { connect } from "react-redux";
import {
  fetchVideo,
  updateVideo,
  destroyVideo,
} from "../../../actions/video_actions";
import { withRouter } from "react-router-dom";
import VideoEdit from "./video_edit";

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.entities.videos[ownProps.match.params.videoId],
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVideo: (video) => dispatch(updateVideo(video)),
    fetchVideo: (id) => dispatch(fetchVideo(id)),
    destroyVideo: (video) => dispatch(destroyVideo(video)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VideoEdit)
);
