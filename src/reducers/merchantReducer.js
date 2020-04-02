import { FETCH_MERCHANTS, FETCH_MERCHANT_BYID } from '../actions/MerchantAction';

export default (state = [], action) => {
    switch(action.type) {
        case FETCH_MERCHANTS:
            return action.payload;
        default:
            return state;
    }
}