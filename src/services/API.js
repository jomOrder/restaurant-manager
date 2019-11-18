import axios from 'axios';
import qs from 'qs';

const url = 'http://54.255.180.84';
const token = '';
const API = axios.create({
  baseURL: url,
  headers: {
    'Authorization': token
  }

});


export default {

  createUser: async (username, password) => {
    return await API.post('/auth/singUp', { username, password});
  },

  loginUser: async (username, password) => {
    return await API.post('/auth/login', qs.stringify({ username, password }));
  }




};
