import API from '../services/API';


export const FETCH_MERCHANTS = 'FETCH_MERCHANTS';
export const FETCH_MERCHANT_BYID = 'FETCH_MERCHANT_BYID';

export const fetchAllMerchant = () => async dispatch => {
    const response = await API.getAllMerchant();
    const { data } = response;
    dispatch({
        type: FETCH_MERCHANTS,
        payload: data.result
    })

}

export const fetchMerchantByID = () => async dispatch => {
    const response = await API.getAllMerchant();
    const { data } = response;
    dispatch({
        type: FETCH_MERCHANT_BYID,
        payload: data.result
    })
}
