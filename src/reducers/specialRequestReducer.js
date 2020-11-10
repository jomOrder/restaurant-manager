import {
    CREATE_SPECIAL_REQUEST,
    BULK_CREATE_SPECIAL_REQUEST,
    UPDATE_SPECIAL_REQUEST,
    UPDATE_SPEICAL_REQUEST_STATUS,
    DELETE_SPECIAL_REQUEST,
    CLEAR_SPECIAL
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_SPECIAL_REQUEST:
            return action.payload;
        case BULK_CREATE_SPECIAL_REQUEST:
            return action.payload;
        case UPDATE_SPECIAL_REQUEST:
            return action.payload;
        case UPDATE_SPEICAL_REQUEST_STATUS:
            return action.payload;
        case DELETE_SPECIAL_REQUEST:
            return action.payload;
        case CLEAR_SPECIAL:
            return [];
        default:
            return state;
    }
}