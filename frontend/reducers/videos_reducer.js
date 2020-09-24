import {
    RECEIVE_VIDEOS,
    RECEIVE_VIDEO,
    DELETE_VIDEO
} from "../actions/video_actions";
import {
    CREATE_VIDEO_LIKE,
    REMOVE_VIDEO_LIKE
} from '../actions/like_actions';
import { merge } from 'lodash';

const videosReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_VIDEOS:
            return action.videos;
        case RECEIVE_VIDEO:
            return { [action.video.id]: action.video };
        case DELETE_VIDEO:
            let nextState = Object.assign({}, state);
            delete nextState[action.video.id];
            return nextState;
        case CREATE_VIDEO_LIKE:
            newState = merge({}, state);
            newState[action.payload.likeableId].numLikes = action.payload.video.numLikes;
            newState[action.payload.likeableId].numDislikes = action.payload.video.numDislikes;
            return newState;
        default:
            return state;   
    }
};

export default videosReducer;