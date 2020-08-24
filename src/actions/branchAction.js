import API from '../services/API';
export const CREATE_BRANCH = 'CREATE_BRANCH';
export const MERCHANT_BRANCHES = 'MERCHANT_BRANCHES';
export const MERCHANT_BRANCHES_COUNT = 'MERCHANT_BRANCHES_COUNT';
export const MERCHANT_BRANCHES_NOT_FOUND = 'MERCHANT_BRANCHES_NOT_FOUND';
export const MERCHANT_BRANCHE_CATEGORY = 'MERCHANT_BRANCHES_CATEGORY';


export const VIEW_BRANCHE = 'VIEW_BRANCHE';
export const VIEW_BRANCHE_CATEGORY = 'VIEW_BRANCHE_CATEGORY';
export const CREATE_BRANCHE_CATEGORY = 'CREATE_BRANCHE_CATEGORY';
export const BULK_CREATE_BRANCHE_CATEGORY = 'BULK_CREATE_BRANCHE_CATEGORY';

export const UPLOAD_BRANCHE_CATEGORY_IMAGE = 'UPLOAD_BRANCHE_CATEGORY_IMAGE';

export const VIEW_ONE_CATEGORY = 'VIEW_ONE_CATEGORY';
export const VIEW_CATEGORY_ITEM = 'VIEW_CATEGORY_ITEM';
export const CREATE_CATEGORY_ITEM = 'CREATE_CATEGORY_ITEM';
export const BULK_CREATE_CATEGORY_ITEM = 'BULK_CREATE_CATEGORY_ITEM';
export const UPDATE_BRANCHE_CATEGORY = 'UPDATE_BRANCHE_CATEGORY';


export const UPLOAD_CATEGORY_ITEM_IMAGE = 'UPLOAD_CATEGORY_ITEM_IMAGE';

export const createNewBranch = (credentials) => async dispatch => {
    
    const response = await API.createBranch(credentials)
    const { data } = response;
    if(data.err === 0) dispatch({
        type: CREATE_BRANCH,
        payload: { err: 0, message: data.message }
    });
};


export const getMerchantBranches = (pageNo) => async dispatch => {
    
    const response = await API.getMerchantBranches(pageNo)
    const { data } = response;
    const { message, result, count } = data;
    if(data.err === 0) dispatch({
        type: MERCHANT_BRANCHES,
        payload: result[0].branches
    });

    if(data.err === 25) dispatch({
        type: MERCHANT_BRANCHES_NOT_FOUND,
        payload: []
    });
};

/**
 * Catgeory GET - POST
 */
export const viewBranch = (branchKey) => async dispatch => {
    const response = await API.viewSingleBranch(branchKey);
    const { data } = response;
    const { result } = data;

    if(data.err === 0) dispatch({
        type: VIEW_BRANCHE,
        payload: result
    });
};


export const viewBranchCategory = (branchKey) => async dispatch => {
    const response = await API.viewBranchCategory(branchKey);
    const { data } = response;
    const { result } = data;
    console.log("result:", data);
    if(data.err === 0) dispatch({
        type: VIEW_BRANCHE_CATEGORY,
        payload: result[0].categories
    });
};


export const createMenu = (credentials, branchKey) => async dispatch => {
    const response = await API.createBranchCategory(credentials, branchKey)
    const { data } = response;
    if(data.err === 0) dispatch({
        type: CREATE_BRANCHE_CATEGORY,
        payload: { err: 0, message: data.message }
    });
};

export const bulkCreateMenu = (credentials, branchKey) => async dispatch => {
    const response = await API.bulkCreateBranchCategory(credentials, branchKey)
    const { data } = response;
    const { err } = data;
    console.log(data);
    if(err === 19) dispatch({
        type: BULK_CREATE_BRANCHE_CATEGORY,
        payload: { err }
    });
};

export const updateMenu = (credentials, categoryID) => async dispatch => {
    const response = await API.updateSingleCategory(credentials, categoryID)
    const { data } = response;
    if(data.err === 0) dispatch({
        type: UPDATE_BRANCHE_CATEGORY,
        payload: { err: 0 }
    });
};



export const uploadBranchCategory = imgFile => async dispatch => {
    const response = await API.uploadBranchCategoryImg(imgFile);
    const { data } = response;

    dispatch({
        type: UPLOAD_BRANCHE_CATEGORY_IMAGE,
        payload: { err: 0, image: data.result }
    });
    
};

/**
 * Item GET - POST
 */

export const viewOneCategory = (categoryID, branchKey) => async dispatch => {
    const response = await API.viewSingleCategory(categoryID, branchKey);
    const { data } = response;
    console.log("data: ", data);
    if(data.err === 0) dispatch({
        type: VIEW_ONE_CATEGORY,
        payload: data
    });

};

export const viewCategoryItem = (categoryID) => async dispatch => {
    const response = await API.viewBranchCategoryItem(categoryID);
    const { data } = response;
    const { result } = data;
    if(data.err === 0) dispatch({
        type: VIEW_CATEGORY_ITEM,
        payload: result[0].items
    });

    if(data.err === 25) dispatch({
        type: VIEW_CATEGORY_ITEM,
        payload: []
    });
};


export const createMenuItem = (credentials, catgeoryID) => async dispatch => {
    const response = await API.createBranchCategoryItem(credentials, catgeoryID)
    const { data } = response;
    const { result } = data;

    if(data.err === 0) dispatch({
        type: CREATE_CATEGORY_ITEM,
        payload: { err: 0, result }
    });
};


export const bulkCreateMenuItem = (credentials, categoryID) => async dispatch => {
    const response = await API.bulkCreateBranchCategoryItem(credentials, categoryID)
    const { data } = response;
    const { err } = data;
    console.log(data);
    if(err === 19) dispatch({
        type: BULK_CREATE_CATEGORY_ITEM,
        payload: { err }
    });
};


export const uploadBranchCategoryItem = imgFile => async dispatch => {
    const response = await API.uploadBranchCategoryImg(imgFile);
    const { data } = response;
    dispatch({
        type: UPLOAD_CATEGORY_ITEM_IMAGE,
        payload: { err: 0, image: data.result }
    });
    
};