import API from '../services/API';
import jwtDecode from 'jwt-decode';
import { history } from '../navigation/index'
import isAfter from 'date-fns/isAfter';

export const USER_LOGIN = 'USER_LOGIN'
export const USER_ERR = 'USER_ERR'
export const UN_AUTHENTICATED = 'UN_AUTHENTICATED'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_CHECK = 'USER_CHECK'
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'


const token = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).exp : null;
const exp = token ? new Date(token * 1000) : null;

export const userLogin = (credentials) => async dispatch => {
    const response = await API.loginUser(credentials);
    try {   

        if (response.data.err === 10) {
            dispatch({
                type: USER_LOGIN,
                payload: { err: 10, token: response.data.token }
            });
        }
        if (response.data.err === 13) dispatch({
            type: USER_ERR,
            payload: { err: 13, message: response.data.message }
        });

    } catch (e) {
        console.log(e)
        dispatch({
            type: INTERNAL_SERVER_ERROR,
            payload: { err: 500 }
        });
    }
}

export const userCheck = (email) => async dispatch => {
    const response = await API.checkUser(email);
    try {
        if (response.data.err === 12 || response.data.err === 20) {
            dispatch({
                type: USER_CHECK,
                payload: { err: response.data.err, message: response.data.message }
            });
        } else  {
            dispatch({
                type: USER_CHECK,
                payload: { err: 0 }
            });
        }

    } catch (e) {
        console.log(e)
    }
}

export const userRegister = (credentials) => async dispatch => {
    const response = await API.createUser(credentials);
    try {
        if (response.data.err === 15) {
            dispatch({
                type: USER_REGISTER,
                payload: { err: 15, message: response.data.message }
            });
        }

    } catch (e) {
        console.log(e)
    }
}

export const isUserTokenAuthenticated = () => dispatch => {
    try {
        if ((!localStorage.getItem('token') || isAfter(new Date(), exp)) &&
            history.location.pathname != '/forgot' && history.location.pathname != '/signup'
            && history.location.pathname != '/verify') {
            dispatch({
                type: UN_AUTHENTICATED,
                payload: { err: 16, message: 'Failed to authenticate' }
            });
            history.push('/signin')
        }
    } catch (e) {
        console.log(e);
        dispatch({
            type: INTERNAL_SERVER_ERROR,
            payload: { message: e.message }
        });
    }
}