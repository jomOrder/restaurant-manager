import { FETCH_MERCHANTS, FETCH_MERCHANT } from '../actions/MerchantAction';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_MERCHANT:
            return action.payload;
        default:
            return state;
    }
}