import {
  RECEIVE_USER,
  RECEIVE_USER_ERRORS,
  CLEAR_ERRORS,
} from "../actions/user_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_USER:
      return [];
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
