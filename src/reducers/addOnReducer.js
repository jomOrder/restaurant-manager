import { VIEW_ADDONS, CREATE_ADDON, DELETE_ADDONS } from '../actions/addOnAction'
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_ADDONS:
            return action.payload
        case CREATE_ADDON:
            return action.payload
        case DELETE_ADDONS:
            return action.payload
        default:
            return state;
    }
}