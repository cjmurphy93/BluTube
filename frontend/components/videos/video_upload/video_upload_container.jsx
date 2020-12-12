import { connect } from "react-redux";
import { createVideo } from "../../../actions/video_actions";
import { closeModal } from "../../../actions/modal_actions";
import { withRouter } from "react-router-dom";
import VideoUpload from "./video_upload";

const mapStateToProps = (state) => {
  return {
    video: {
      title: "",
      description: "",
      videoUrl: null,
      videoFile: null,
      fileError: false,
    },
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVideo: (video) => dispatch(createVideo(video)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VideoUpload)
);
