import API from '../services/API';
export const CREATE_SPECIAL_REQUEST = 'CREATE_SPECIAL_REQUEST';
export const VIEW_SPECIAL_REQUEST = 'VIEW_SPECIAL_REQUEST';
export const VIEW_SPECIAL_REQUEST_NOT_FOUND = 'VIEW_SPECIAL_REQUEST_NOT_FOUND';
export const UPDATE_SPECIAL_REQUEST = 'UPDATE_SPECIAL_REQUEST';
export const DELETE_SPECIAL_REQUEST= 'DELETE_SPECIAL_REQUEST';

export const CLEAR_SPECIAL_REQUEST= 'CLEAR_SPECIAL_REQUEST';
export const CLEAR_SPECIAL = 'CLEAR_SPECIAL';


export const viewSpecialRequestItem = (itemID, page = 0) => async dispatch => {
    const response = await API.viewSpecialRequest(itemID, page);
    const { data } = response;
    const { result, count } = data;
    if (data.err === 0) dispatch({
        type: VIEW_SPECIAL_REQUEST,
        payload: [{ items: result[0].specials, count}]
    })
    if (data.err === 25) dispatch({
        type: VIEW_SPECIAL_REQUEST_NOT_FOUND,
        payload: []
    });
};

export const createSpeicalRequestItem = (credentials, itemID) => async dispatch => {
    const response = await API.createSpecialRequest(credentials, itemID)
    const { data } = response;
    if (data.err === 19) dispatch({
        type: CREATE_SPECIAL_REQUEST,
        payload: { err: 19 }
    });
};

export const updateSpecialRequestItem = (id, credentials) => async dispatch => {

    const response = await API.updateSpecialRequest(id, credentials)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: UPDATE_SPECIAL_REQUEST,
        payload: { err, message }
    });
};

export const deleteSpeicalRequestItem = (id) => async dispatch => {

    const response = await API.removeSpecialRequest(id)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: DELETE_SPECIAL_REQUEST,
        payload: { err, message }
    });
};