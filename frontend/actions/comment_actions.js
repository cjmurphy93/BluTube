import * as APIUtil from '../util/comment_api_util';
import { DELETE_VIDEO } from './video_actions';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_REPLY = 'RECEIVE_REPLY';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

export const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

export const receiveReply = comment => ({
    type: RECEIVE_REPLY,
    comment
});

export const receiveCommentErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
});

export const clearCommentErrors = () => ({
    type: CLEAR_ERRORS
});

export const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
});

export const fetchComments = videoId => dispatch => (
    APIUtil.fetchComments(videoId).then(comments => (
        dispatch(receiveComments(comments))
    ))
);

export const fetchComment = commentId => dispatch => (
    APIUtil.fetchComment(commentId).the(comment => (
        dispatch(receiveComment(comment))
    ))
);

export const createComment = comment => dispatch => (
    APIUtil.createComment(comment).then(comment => (
        dispatch(receiveComment(comment))
    ), err => (
        dispatch(receiveCommentErrors(err.responseJSON))
    ))
);

export const createReply = comment => dispatch => (
    APIUtil.createComment(comment).then(comment => (
        dispatch(receiveReply(comment))
    ), err => (
        dispatch(receiveCommentErrors(err.responseJSON))
    ))
);

export const updateComment = comment => dispatch => (
    APIUtil.updateComment(comment).then(comment => (
        dispatch(receiveComment(comment))
    ), err => (
        dispatch(receiveCommentErrors(err.responseJSON))
    ))
);

export const destroyComment = commentId => dispatch => (
    APIUtil.destroyComment(commentId).then(comment => (
        dispatch(deleteComment(comment.id))
    ), err => (
        dispatch(receiveCommentErrors(err.responseJSON))
    ))
);