import {
    CREATE_CATEGORY_ITEM,
    VIEW_CATEGORY_ITEM
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_CATEGORY_ITEM:
            return action.payload;
        case VIEW_CATEGORY_ITEM:
            return action.payload;
        default:
            return state;
    }
}