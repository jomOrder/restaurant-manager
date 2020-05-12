import {
    CREATE_BRANCHE_CATEGORY,
    VIEW_BRANCHE_CATEGORY
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_BRANCHE_CATEGORY:
            return action.payload;
        case VIEW_BRANCHE_CATEGORY:
            return action.payload;
        default:
            return state;
    }
}