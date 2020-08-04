import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/video_actions';
import {fetchUser, fetchUsers} from '../../actions/user_actions';
import VideoIndex from './video_index';

const mapStateToProps = ({ entities }) => {
    return {
        videos: entities.videos,
        users: entities.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchVideos: () => dispatch(fetchVideos()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        fetchUsers: () => dispatch(fetchUsers())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);