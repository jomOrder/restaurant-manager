import {
    VIEW_BRANCHE
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_BRANCHE:
            return action.payload;
        default:
            return state;
    }
}