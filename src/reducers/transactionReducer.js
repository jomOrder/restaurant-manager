import { FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_NOT_FOUND } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            return action.payload;
        case FETCH_TRANSACTIONS_NOT_FOUND:
            return action.payload;
        default:
            return state;
    }
}