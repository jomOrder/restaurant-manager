import { USER_LOGIN } from '../actions/userLoginAction'
export default (state = [], action) => {
    switch (action.type) {
        case 'UNAUTHENTICATED':
            return action.payload
        case USER_LOGIN:
            return action.payload
        case 'USERERR':
            return action.payload
        default:
            return state;
    }
}