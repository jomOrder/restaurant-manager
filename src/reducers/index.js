import { combineReducers } from "redux";
import merchants from './merchantReducer';
import branches from './branchReducer';
import auth from './authReducer';
import getBranch from './viewBranch';
import uploadMenuImage from './uploadMenuImg';
import categories from './categoryReducer';
import createCategory from './createCategoryReducer';
import uploadMerchant from './uploadMerchantReducer';

import transaction from './transactionReducer';
import analytics from './analyticsReducer';

import items from './ItemReducer';
import viewSingleCategory from './viewOneCategory'
import banks from './onlineBankingReducer'
import itemAddOn from './addOnReducer'
import updateImage from './updateImage';


import viewItem from './viewChooseItemReducer';
import chooseItem from './chooseItemReducer';

import viewSpecialRequest from './viewSpecialRequestReducer'
import specialRequest from './specialRequestReducer'

export default combineReducers({
    merchants,
    branches,
    transaction,
    categories,
    createCategory,
    items,
    viewSingleCategory,
    getBranch,
    uploadMenuImage,
    uploadMerchant,
    auth,
    banks,
    analytics,
    updateImage,
    itemAddOn,
    chooseItem,
    viewItem,
    viewSpecialRequest,
    specialRequest
});