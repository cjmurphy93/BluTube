import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    RECEIVE_REPLY,
    DELETE_COMMENT
} from '../actions/comment_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            return Object.assign({}, state, { [action.comment.id]: action.comment});
        case RECEIVE_REPLY:
            const parentComment = Object.assigin({}, state[action.comment.commentable_id]);
            parentComment.replies.push(action.comment);
            return Object.assign({}, state, {[parentComment.id]: parentComment});
        case DELETE_COMMENT:
            let newState = Object.assign({}, state);
            delete newState[action.commentId];
            return newState;
        default:
            return state; 
    }
}