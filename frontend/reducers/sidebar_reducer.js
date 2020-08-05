import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../actions/sidebar_actions';

const sidebarReducer = (state={open: true}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case OPEN_SIDEBAR:
            return {open: true};
        case CLOSE_SIDEBAR:
            return {open: false};
        default:
            return state;
    }
};

export default sidebarReducer;