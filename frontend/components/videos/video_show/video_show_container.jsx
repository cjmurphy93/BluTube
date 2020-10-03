import { connect } from 'react-redux';
import { fetchVideo, destroyVideo } from '../../../actions/video_actions';
import { fetchUser } from '../../../actions/user_actions';
import VideoShow from './video_show';

const mapStateToProps = (state, ownProps) => {
     
    return {
      video: state.entities.videos[ownProps.match.params.videoId],
      currentUser: state.entities.users[state.session.id],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
        destroyVideo: (video) => dispatch(destroyVideo(video))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);