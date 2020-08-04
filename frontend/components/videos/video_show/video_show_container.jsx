import { connect } from 'react-redux';
import { fetchVideo } from '../../../actions/video_actions';
import { fetchUser } from '../../../actions/user_actions';
import VideoShow from './video_show';

const mapStateToProps = (state, ownProps) => {
     
    return {
        video: state.entities.videos[ownProps.match.params.videoId]
        // user: entities.users[video.creator_id]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        fetchVideo: (videoId) => dispatch(fetchVideo(videoId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);