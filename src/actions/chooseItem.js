import API from '../services/API';
export const CREATE_CHOOSE_ITEM = 'CREATE_CHOOSE_ITEM';
export const VIEW_CHOOSE_ITEM = 'VIEW_CHOOSE_ITEM';
export const VIEW_CHOOSE_ITEM_NOT_FOUND = 'VIEW_CHOOSE_ITEM_NOT_FOUND';
export const UPDATE_CHOOSE_ITEM = 'UPDATE_CHOOSE_ITEM';
export const DELETE_CHOOSE_ITEM = 'DELETE_CHOOSE_ITEM';

export const CLEAR_CHOOSE_ITEM = 'CLEAR_CHOOSE_ITEM';
export const CLEAR_CHOOSE = 'CLEAR_CHOOSE';


export const viewAllItem = (itemID, page = 0) => async dispatch => {
    const response = await API.viewChooseItem(itemID, page);
    const { data } = response;
    const { result, count } = data;
    if (data.err === 0) dispatch({
        type: VIEW_CHOOSE_ITEM,
        payload: [{ items: result[0].chooseItems, count}]
    })
    if (data.err === 25) dispatch({
        type: VIEW_CHOOSE_ITEM_NOT_FOUND,
        payload: []
    });
};

export const createItem = (credentials, itemID) => async dispatch => {
    const response = await API.createChooseItem(credentials, itemID)
    const { data } = response;
    if (data.err === 19) dispatch({
        type: CREATE_CHOOSE_ITEM,
        payload: { err: 19 }
    });
};

export const updateItem = (id, credentials) => async dispatch => {

    const response = await API.updateChooseItem(id, credentials)
    const { data } = response;
    const { err, message } = data;

    if (data.err === 21) dispatch({
        type: UPDATE_CHOOSE_ITEM,
        payload: { err, message }
    });
};

export const deleteItem = (id) => async dispatch => {

    const response = await API.removeChooseItem(id)
    const { data } = response;
    const { err, message } = data;
    if (data.err === 21) dispatch({
        type: DELETE_CHOOSE_ITEM,
        payload: { err, message }
    });
};