import { CREATE_BRANCH, MERCHANT_BRANCHES, MERCHANT_BRANCHES_NOT_FOUND, MERCHANT_BRANCHES_COUNT } from '../actions/branchAction';
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_BRANCH:
            return action.payload;
        case MERCHANT_BRANCHES:
            return action.payload;
        case MERCHANT_BRANCHES_COUNT:
            return action.payload;
        case MERCHANT_BRANCHES_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}