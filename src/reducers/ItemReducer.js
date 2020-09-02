import {
    CREATE_CATEGORY_ITEM,
    BULK_CREATE_CATEGORY_ITEM,
    VIEW_CATEGORY_ITEM,
    UPDATE_BRANCHE_CATEGORY_ITEM,
    DELETE_BRANCHE_CATEGORY_ITEM,
    DELETE_BRANCHE_ITEM_ERR,
    CLEAR_ITEM
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_CATEGORY_ITEM:
            return action.payload;
        case BULK_CREATE_CATEGORY_ITEM:
            return action.payload;
        case VIEW_CATEGORY_ITEM:
            return action.payload;
        case UPDATE_BRANCHE_CATEGORY_ITEM:
            return action.payload;
        case DELETE_BRANCHE_CATEGORY_ITEM:
            return action.payload;
        case DELETE_BRANCHE_ITEM_ERR:
            return action.payload;
        case CLEAR_ITEM:
            return [];
        default:
            return state;
    }
}