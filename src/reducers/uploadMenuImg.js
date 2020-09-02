import {
    UPLOAD_BRANCHE_CATEGORY_IMAGE,
    UPLOAD_CATEGORY_ITEM_IMAGE,
    CLEAR_IMAGE
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_BRANCHE_CATEGORY_IMAGE:
            return action.payload;
        case UPLOAD_CATEGORY_ITEM_IMAGE:
            return action.payload;
        case CLEAR_IMAGE:
            return []
        default:
            return state;
    }
}