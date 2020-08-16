import {
    VIEW_BRANCHE_CATEGORY
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_BRANCHE_CATEGORY:
            return action.payload;
        default:
            return state;
    }
}