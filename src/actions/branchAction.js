import API from '../services/API';
export const CREATE_BRANCH = 'CREATE_BRANCH';
export const MERCHANT_BRANCHES = 'MERCHANT_BRANCHES';
export const MERCHANT_BRANCHES_NOT_FOUND = 'MERCHANT_BRANCHES_NOT_FOUND';
export const createBranch = (credentials) => async dispatch => {
    
    const response = await API.createBranch(credentials)
    const { data } = response;

    if(data.err === 0) dispatch({
        type: CREATE_BRANCH,
        payload: { err: 0, message: data.message }
    });
};


export const getMerchantBranches = (pageNo = 0) => async dispatch => {
    
    const response = await API.getMerchantBranches(pageNo)
    const { data } = response;
    const { message, result } = data;

    if(data.err === 0) dispatch({
        type: MERCHANT_BRANCHES,
        payload: { err: 0, result }
    });

    if(data.err === 25) dispatch({
        type: MERCHANT_BRANCHES_NOT_FOUND,
        payload: { err: 25, message }
    });
};