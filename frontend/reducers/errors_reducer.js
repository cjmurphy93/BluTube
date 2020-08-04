import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import video from './video_errors_reducer';

export default combineReducers({
    session,
    video
});