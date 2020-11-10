import { CREATE_ADDON, DELETE_ADDONS, UPDATE_ADDONS_STATUS, CLEAR_UDPATE_ADD_ON_STATUS, BULK_CREATE_ADDON } from '../actions/addOnAction'
export default (state = [], action) => {
    switch (action.type) {
        case CREATE_ADDON:
            return action.payload
        case BULK_CREATE_ADDON:
            return action.payload
        case UPDATE_ADDONS_STATUS:
            return action.payload
        case DELETE_ADDONS:
            return action.payload
        case CLEAR_UDPATE_ADD_ON_STATUS:
            return [];
        default:
            return state;
    }
}