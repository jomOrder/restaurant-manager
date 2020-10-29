import { VIEW_ADDONS } from '../actions/addOnAction'
export default (state = [], action) => {
    switch (action.type) {
        case VIEW_ADDONS:
            return action.payload
        default:
            return state;
    }
}