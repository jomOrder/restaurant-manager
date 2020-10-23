import API from '../services/API';
export const FETCH_DASHBOARD = 'FETCH_DASHBOARD';
export const FETCH_DASHBOARD_NOT_FOUND = 'FETCH_DASHBOARD_NOT_FOUND';

export const viewMerchantData = () => async dispatch => {

    const response = await API.viewAnalytics()
    const { data } = response;
    const { result } = data;
    console.log(data);
    if (data.err === 0) dispatch({
        type: FETCH_DASHBOARD,
        payload: result
    });
    if (data.err === 25) dispatch({
        type: FETCH_DASHBOARD_NOT_FOUND,
        payload: []
    });
};
