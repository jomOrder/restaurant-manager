import {
    UPLOAD_MERCHANT_IMAGE
} from '../actions';
export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_MERCHANT_IMAGE:
            return action.payload;
        default:
            return state;
    }
}