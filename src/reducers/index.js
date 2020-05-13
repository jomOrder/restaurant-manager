import { combineReducers } from "redux";
import merchants from './merchantReducer';
import branches from './branchReducer';
import auth from './authReducer';
import getBranch from './viewBranch';
import uploadMenuImage from './uploadMenuImg';
import categories from './categoryReducer';
import items from './ItemReducer';
import viewSingleCategory from './viewOneCategory'
export default combineReducers({
    merchants,
    branches,
    categories,
    items,
    viewSingleCategory,
    getBranch,
    uploadMenuImage,
    auth
});