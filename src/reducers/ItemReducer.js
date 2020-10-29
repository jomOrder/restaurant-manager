import {
    VIEW_CATEGORY_ITEM,
    CLEAR_BRANCHE_CATEGORY_ITEM,

} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_CATEGORY_ITEM:
            return action.payload;
        case CLEAR_BRANCHE_CATEGORY_ITEM:
            return [];
        default:
            return state;
    }
}