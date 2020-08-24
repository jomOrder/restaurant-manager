import API from '../services/API';


export const FETCH_MERCHANTS = 'FETCH_MERCHANTS';
export const FETCH_MERCHANT = 'FETCH_MERCHANT';

export const UPLOAD_MERCHANT_IMAGE = 'UPLOAD_MERCHANT_IMAGE';


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


export const uploadMerchantImage = (imgFile, name) => async dispatch => {
    const response = await API.uploadMerchantImage(imgFile, name);
    const { data } = response;
    console.log("data from uploadMerchantImage Action:", data.result)
    dispatch({
        type: UPLOAD_MERCHANT_IMAGE,
        payload: { err: 0, image: data.result }
    });
    
};