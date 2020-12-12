import {
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
  RECEIVE_REPLY,
  DELETE_COMMENT,
} from "../actions/comment_actions";
import {
  CREATE_COMMENT_LIKE,
  REMOVE_COMMENT_LIKE,
} from "../actions/like_actions";
import { merge } from "lodash";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      return Object.assign({}, state, { [action.comment.id]: action.comment });
    case RECEIVE_REPLY:
      const parentComment = Object.assign(
        {},
        state[action.comment.commentable_id]
      );
      parentComment.replies.push(action.comment);
      return Object.assign({}, state, { [parentComment.id]: parentComment });
    case DELETE_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.commentId];
      return newState;
    case CREATE_COMMENT_LIKE:
      newState = merge({}, state);
      return newState;
    case REMOVE_COMMENT_LIKE:
      newState = merge({}, state);
      return newState;
    default:
      return state;
  }
};
