import {
    UPLOAD_BRANCHE_CATEGORY_IMAGE
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_BRANCHE_CATEGORY_IMAGE:
            return action.payload;
        default:
            return state;
    }
}