import { combineReducers } from "redux";
import merchants from './merchantReducer';
import branches from './branchReducer';
import auth from './authReducer';
import getBranch from './viewBranch';
import uploadMenuImage from './uploadMenuImg';
import categories from './categoryReducer';
import createCategory from './createCategoryReducer';

import uploadMerchant from './uploadMerchantReducer';


import items from './ItemReducer';
import viewSingleCategory from './viewOneCategory'
import banks from './onlineBankingReducer'
import itemAddOn from './addOnReducer'
import updateImage from './updateImage';

export default combineReducers({
    merchants,
    branches,
    categories,
    createCategory,
    items,
    viewSingleCategory,
    getBranch,
    uploadMenuImage,
    uploadMerchant,
    auth,
    banks,
    updateImage,
    itemAddOn
});