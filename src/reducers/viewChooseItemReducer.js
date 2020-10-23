import {
    VIEW_CHOOSE_ITEM,
    VIEW_CHOOSE_ITEM_NOT_FOUND,
    CLEAR_CHOOSE_ITEM
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_CHOOSE_ITEM:
            return action.payload;
        case VIEW_CHOOSE_ITEM_NOT_FOUND:
            return action.payload;
        case CLEAR_CHOOSE_ITEM:
            return [];
        default:
            return state;
    }
}