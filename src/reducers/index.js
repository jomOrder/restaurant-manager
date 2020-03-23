import { combineReducers } from "redux";
import merchants from './merchantReducer';
import branches from './branchReducer';
import auth from './authReducer';

export default combineReducers({
    merchants,
    branches,
    auth
});