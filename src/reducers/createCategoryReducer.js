import {
    CREATE_BRANCHE_CATEGORY,
    BULK_CREATE_BRANCHE_CATEGORY,
    UPDATE_BRANCHE_CATEGORY,
    DELETE_BRANCHE_CATEGORY,
    DELETE_BRANCHE_CATEGORY_ERR,
    CLEAR_CATEGORY
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_BRANCHE_CATEGORY:
            return action.payload;
        case BULK_CREATE_BRANCHE_CATEGORY:
            return action.payload;
        case UPDATE_BRANCHE_CATEGORY:
            return action.payload;
        case DELETE_BRANCHE_CATEGORY:
            return action.payload;
        case DELETE_BRANCHE_CATEGORY_ERR:
            return action.payload;
        case CLEAR_CATEGORY:
            return []
        default:
            return state;
    }
}