import { connect } from 'react-redux';
import { createVideoLike, deleteVideoLike } from '../../../actions/like_actions';
import VideoLikes from './video_likes';

const mapStateToProps = (state, ownProps) => {
    const video = ownProps.video;
    const currentUser = state.entities.users[state.session.id];
    return {
        video,
        currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    createVideoLike: (videoId, dislike) => dispatch(createVideoLike(videoId, dislike)),
    deleteVideoLike: (videoId) => dispatch(deleteVideoLike(videoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoLikes);
