import API from '../services/API';
export const fetchAllMerchant = () => async dispatch => {
    const response = await API.getAllMerchant();
    dispatch({
        type: "FETCH_MERCHANTS",
        payload: response.data
    })
}

export const fetchmerchantByID = (userID) => async dispatch => {
    const response = await API.getMerchantByID(userID);
    dispatch({
        type: 'FETCH_MERCHANT_BYID',
        payload: response.data
    })
}
