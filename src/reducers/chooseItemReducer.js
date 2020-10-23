import {
    CREATE_CHOOSE_ITEM,
    UPDATE_CHOOSE_ITEM,
    DELETE_CHOOSE_ITEM,
    CLEAR_CHOOSE
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_CHOOSE_ITEM:
            return action.payload;
        case UPDATE_CHOOSE_ITEM:
            return action.payload;
        case DELETE_CHOOSE_ITEM:
            return action.payload;
        case CLEAR_CHOOSE:
            return [];
        default:
            return state;
    }
}