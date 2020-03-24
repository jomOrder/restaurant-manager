import { USER_LOGIN, USER_ERR } from '../actions/userLoginAction'
export default (state = [], action) => {
    switch (action.type) {
        case 'UNAUTHENTICATED':
            return action.payload
        case USER_LOGIN:
            return action.payload
        case USER_ERR:
            return action.payload
        default:
            return state;
    }
}