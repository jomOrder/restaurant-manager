import axios from 'axios';
import qs from 'qs';

const url = 'http://54.255.180.84';
const token = '';
const API = axios.create({
  baseURL: url,
  headers: {
    'Authorization': `Bearer ${token}`
  }

});


export default {

  createUser: async (username, password) => {
    return await API.post('/auth/web/singUp', { username, password});
  },

  loginUser: async (username, password) => {
    return await API.post('/auth/web/login', qs.stringify({ username, password }));
  }




};
