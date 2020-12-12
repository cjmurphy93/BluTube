import { connect } from "react-redux";
import {
  fetchVideos,
  fetchVideo,
  destroyVideo,
} from "../../../actions/video_actions";
import { fetchUser } from "../../../actions/user_actions";
import VideoShow from "./video_show";

const mapStateToProps = (state, ownProps) => {
  return {
    video: state.entities.videos[ownProps.match.params.videoId],
    currentUser: state.entities.users[state.session.id],
    videos: state.entities.videos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch(fetchVideos()),
    destroyVideo: (video) => dispatch(destroyVideo(video)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);
