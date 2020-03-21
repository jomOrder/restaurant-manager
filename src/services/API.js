import axios from "axios";
import qs from "qs";

const url = "http://localhost:3000/api";

const API = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token
    }
  };
  return config;
});


//qs.stringify()

export default {
  createUser: async credentials => {
    return API.post(
      "/user/auth/web/register",
      credentials
    );
  },

  loginUser: async credentials => {
    return API.post(
      "/user/auth/web/login",
      credentials
    );
  },

  resetPassword: async credentials => {
    return API.post(
      "/user/auth/web/reset_password",
      credentials
    );
  },

  getAllMerchant: async => {
    return API.get(`/merchant`);
  },

  getMerchantByID: async userID => {
    return API.get(`/merchant`, { params: userID });
  },

};
