import API from '../services/API';
export const CREATE_ADDON = 'CREATE_ADDON';
export const VIEW_ADDONS = 'VIEW_ADDONS';
export const UPDATE_ADDONS_STATUS = 'UPDATE_ADDONS_STATUS';

export const CLEAR_UDPATE_ADD_ON_STATUS = 'CLEAR_UDPATE_ADD_ON_STATUS';


export const DELETE_ADDONS = 'DELETE_ADDONS';

export const createNewAddOn = (credentials, itemID) => async dispatch => {

    const response = await API.createItemAddOn(credentials, itemID)
    const { data } = response;
    if (data.err === 19) dispatch({
        type: CREATE_ADDON,
        payload: { err: 19, message: data.message }
    });
};

export const viewItemAddOn = (itemID, page) => async dispatch => {

    const response = await API.viewItemAddOn(itemID, page)
    const { data } = response;
    const { result, count } = data;
    if (data.err === 0) dispatch({
        type: VIEW_ADDONS,
        payload: [{ addOns: result[0].addOns, count }]
    });
    if (data.err === 25) dispatch({
        type: VIEW_ADDONS,
        payload: []
    });
};



export const updateItemViewAddOn = (itemAddOnID, cred) => async dispatch => {

    const response = await API.updateItemAddOn(itemAddOnID, cred)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: UPDATE_ADDONS_STATUS,
        payload: { err, message }
    });
};



export const removeItemViewAddOn = (itemAddOnID) => async dispatch => {

    const response = await API.removeItemAddOn(itemAddOnID)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: DELETE_ADDONS,
        payload: { err, message }
    });
};
