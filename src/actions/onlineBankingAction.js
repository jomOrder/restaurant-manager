import API from '../services/API';


export const FETCH_BANKS = 'FETCH_BANKS';

export const viewAllBanking = () => async dispatch => {
    const response = await API.viewAllFPXBanks();
    const { data } = response;
    console.log(data)
    dispatch({
        type: FETCH_BANKS,
        payload: data.responseDataB2C.bankList
    })
}
