import API from '../services/API';
import { push } from 'react-router-redux'

export const USER_LOGIN = 'USER_LOGIN'

export const userLogin = (credentials) => async dispatch => {
    try {
        const response = await API.loginUser(credentials);
        dispatch({
            type: 'USERLOGIN',
            payload: response.data
        })
        
    } catch(e) {
        dispatch({
            type: 'USERERR',
            payload: e.message
        })
    }
}