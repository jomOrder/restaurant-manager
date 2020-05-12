import { combineReducers } from "redux";
import merchants from './merchantReducer';
import branches from './branchReducer';
import auth from './authReducer';
import getBranch from './viewBranch';
import uploadMenuImage from './uploadMenuImg';
import categories from './categoryReducer';
import viewCatgeories from './viewCategories'
export default combineReducers({
    merchants,
    branches,
    categories,
    getBranch,
    uploadMenuImage,
    auth
});