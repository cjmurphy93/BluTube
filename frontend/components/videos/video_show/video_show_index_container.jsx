import { connect } from 'react-redux';
import { fetchVideos } from '../../../actions/video_actions';
import VideoShowIndex from './video_show_index';

const mapStateToProps = (state, ownProps) => {
     
    return {
      videos: state.entities.videos
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchVideos: () => dispatch(fetchVideos()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoShowIndex);