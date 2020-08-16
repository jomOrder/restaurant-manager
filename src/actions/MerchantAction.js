import API from '../services/API';


export const FETCH_MERCHANTS = 'FETCH_MERCHANTS';
export const FETCH_MERCHANT = 'FETCH_MERCHANT';

export const fetchAllMerchant = () => async dispatch => {
    const response = await API.getAllMerchant();
    const { data } = response;
    dispatch({
        type: FETCH_MERCHANTS,
        payload: data.result
    })

}

export const viewSingleMerchant = () => async dispatch => {
    const response = await API.viewMerchant();
    const { data } = response;
    dispatch({
        type: FETCH_MERCHANT,
        payload: data.result
    })
}
