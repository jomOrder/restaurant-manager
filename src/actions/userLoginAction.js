import API from '../services/API';
import { push } from 'react-router-redux'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_ERR = 'USER_ERR'

export const userLogin = (credentials) => async dispatch => {
    try {
        const response = await API.loginUser(credentials);
        if(response.data.err === 0) dispatch({
            type: USER_LOGIN,
            payload: { token: response.data.token }});

        if(response.data.err === 403) dispatch({
            type: USER_ERR,
            payload: { message: response.data.message}});
        
    } catch(e) {
       
    }
}