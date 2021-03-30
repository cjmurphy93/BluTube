import { combineReducers } from "redux";
import session from "./session_errors_reducer";
import video from "./video_errors_reducer";
import comment from "./comment_errors_reducer";
import user from "./user_errors_reducer";

export default combineReducers({
  session,
  user,
  video,
  comment,
});
