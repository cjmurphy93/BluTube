import { connect } from 'react-redux';
import { searchVideos } from '../../../actions/video_actions';
import { withRouter } from 'react-router-dom';
import SearchBar from './search_bar';

const mapStateToProps = (state) => {
    return {
        videos: Object.values(state.entities.videos),
    }
};

const mapDispatchToProps = dispatch => ({
    searchVideos: (query) => dispatch(searchVideos(query)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));