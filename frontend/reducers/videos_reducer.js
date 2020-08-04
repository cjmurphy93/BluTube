import {
    RECEIVE_VIDEOS,
    RECEIVE_VIDEO,
    DELETE_VIDEO
} from "../actions/video_actions";

const videosReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_VIDEOS:
            return action.videos;
        case RECEIVE_VIDEO:
            return { [action.video.id]: action.video };
        case DELETE_VIDEO:
            let nextState = Object.assign({}, state);
            delete nextState[action.video.id];
            return nextState;
        default:
            return state;   
    }
};

export default videosReducer;