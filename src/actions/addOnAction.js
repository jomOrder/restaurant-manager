import API from '../services/API';
export const CREATE_ADDON = 'CREATE_ADDON';
export const VIEW_ADDONS = 'VIEW_ADDONS';
export const UPDATE_ADDONS = 'UPDATE_ADDONS';

export const createNewAddOn = (credentials, itemID) => async dispatch => {

    const response = await API.createItemAddOn(credentials, itemID)
    const { data } = response;
    console.log(data);
    if (data.err === 0) dispatch({
        type: CREATE_ADDON,
        payload: { err: 0, message: data.message }
    });
};


export const viewItemAddOn = (itemID) => async dispatch => {

    const response = await API.viewItemAddOn(itemID)
    const { data } = response;
    const { result } = data;
    if (data.err === 0) dispatch({
        type: VIEW_ADDONS,
        payload: result[0].addOns
    });
    if (data.err === 25) dispatch({
        type: VIEW_ADDONS,
        payload: { err: 25, message: data.message }
    });
    else {
        dispatch({
            type: VIEW_ADDONS,
            payload: data
        });
    }
};



export const updateItemViewAddOn = (itemAddOnID) => async dispatch => {

    const response = await API.updateItemAddOn(itemAddOnID)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: UPDATE_ADDONS,
        payload: { err, message }
    });
};
