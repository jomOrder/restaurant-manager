import { FETCH_DASHBOARD, FETCH_DASHBOARD_NOT_FOUND } from '../actions'
export default (state = [], action) => {
    switch (action.type) {
        case FETCH_DASHBOARD:
            return action.payload
        case FETCH_DASHBOARD_NOT_FOUND:
            return action.payload
        default:
            return state;
    }
}