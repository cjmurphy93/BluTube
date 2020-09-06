import {connect} from 'react-redux';
import {createVideo} from '../../../actions/video_actions';
import VideoUpload from './video_upload';

const mapStateToProps = state => {
    return {
        video: {
            title: '',
            description: '',
            videoUrl: null,
            videoFile: null
        },
        currentUser: state.entities.users[state.session.id]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createVideo: video => dispatch(createVideo(video))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoUpload);