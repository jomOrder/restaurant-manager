import {
    VIEW_ONE_CATEGORY
} from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_ONE_CATEGORY:
            return action.payload;
        default:
            return state;
    }
}