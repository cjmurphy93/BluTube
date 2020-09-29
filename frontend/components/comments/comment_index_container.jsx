import { connect } from 'react-redux';
import { fetchComments } from '../../actions/comment_actions';
import CommentIndex from './comment_index';

const mapStateToProps = ({ session, entities: { users, videos, comments } }, ownProps) => ({
    currentUser: users[session.id],
    currentVideoId: ownProps.currentVideoId,
    video: ownProps.video,
    comments
});

const mapDispatchToProps = dispatch => ({
    fetchComments: videoId => dispatch(fetchComments(videoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndex);