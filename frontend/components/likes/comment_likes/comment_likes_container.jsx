import { connect } from 'react-redux';
import { createCommentLike, deleteCommentLike } from '../../../actions/like_actions';
import CommentLikes from './comment_likes';

const mapStateToProps = (state, ownProps) => {
    const comment = ownProps.comment;
    const currentUser = state.entities.users[state.session.id];
    let currentUserLiked;
    let currentUserDisliked;
    if (currentUser) {
        if (comment.likedByCurrentUser && !comment.dislikedByCurrentUser){
            currentUserLiked = true;
            currentUserDisliked = false;
        } else if (comment.dislikedByCurrentUser && !comment.likedByCurrentUser) {
            currentUserLiked = false;
            currentUserDisliked = true;
        } else {
            currentUserLiked = false;
            currentUserDisliked = false;
        };
    };
    return {
        comment,
        currentUser,
        currentUserLiked,
        currentUserDisliked
    };
};

const mapDispatchToProps = dispatch => ({
    createCommentLike: (commentId, dislike) => dispatch(createCommentLike(commentId, dislike)),
    deleteCommentLike: (commentId) => dispatch(deleteCommentLike(commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentLikes);