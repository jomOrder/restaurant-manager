import { combineReducers } from "redux";

const sampleReducer = () => {
    return [
        {title: "Ahmed", duration: 10},
        {title: "Ahmed", duration: 10},
        {title: "Ahmed", duration: 10},
    ]
}

const selectedSimplerReducer = (selectedReducer = null, action) => {
    if(action.type === 'SELECTED_BRANCH') return action.payload;

    return selectedReducer;
}

export default combineReducers({
    branches: sampleReducer,
    selectedBranches: selectedSimplerReducer
})