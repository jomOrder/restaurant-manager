import { FETCH_BANKS } from '../actions/onlineBankingAction';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_BANKS:
            return action.payload;
        default:
            return state;
    }
}