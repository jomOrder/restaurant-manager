import {
    CREATE_SPECIAL_REQUEST,
    UPDATE_SPECIAL_REQUEST,
    DELETE_SPECIAL_REQUEST,
    CLEAR_SPECIAL
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_SPECIAL_REQUEST:
            return action.payload;
        case UPDATE_SPECIAL_REQUEST:
            return action.payload;
        case DELETE_SPECIAL_REQUEST:
            return action.payload;
        case CLEAR_SPECIAL:
            return [];
        default:
            return state;
    }
}