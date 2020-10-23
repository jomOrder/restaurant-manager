import {
    VIEW_SPECIAL_REQUEST,
    VIEW_SPECIAL_REQUEST_NOT_FOUND,
    CLEAR_SPECIAL_REQUEST
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_SPECIAL_REQUEST:
            return action.payload;
        case VIEW_SPECIAL_REQUEST_NOT_FOUND:
            return state;
        case CLEAR_SPECIAL_REQUEST:
            return []; 
        default:
            return state;
    }
}