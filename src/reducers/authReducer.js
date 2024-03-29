import { USER_LOGIN, USER_ERR, UN_AUTHENTICATED, USER_REGISTER, USER_CHECK, INTERNAL_SERVER_ERROR } from '../actions/userAction'
export default (state = [], action) => {
    switch (action.type) {
        case UN_AUTHENTICATED:
            return action.payload
        case USER_LOGIN:
            return action.payload
        case USER_REGISTER:
            return action.payload
        case USER_CHECK:
            return action.payload
        case USER_ERR:
            return action.payload
        case INTERNAL_SERVER_ERROR:
            return action.payload
        default:
            return state;
    }
}