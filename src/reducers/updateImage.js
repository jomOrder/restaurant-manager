import {
    UPDATE_BRANCHE_CATEGORY_IMAGE,
    UPDATE_BRANCHE_CATEGORY_ITEM_IMAGE
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case UPDATE_BRANCHE_CATEGORY_IMAGE:
            return action.payload;
        case UPDATE_BRANCHE_CATEGORY_ITEM_IMAGE:
            return action.payload;
        default:
            return state;
    }
}