import axios from "axios";
import qs from "qs";

const user = localStorage.getItem("user");
const parsedJson = JSON.parse(user);

const url = "http://54.255.180.84/api";

const token = parsedJson ? parsedJson.token : "";
console.log(token);
const API = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default {
  createUser: async (username, password) => {
    return await API.post(
      "/auth/web/register",
      qs.stringify({ username, password })
    );
  },

  loginUser: async (username, password) => {
    return await API.post(
      "/auth/web/login",
      qs.stringify({ username, password })
    );
  },

  resetPassword: async (username, password) => {
    return await API.post(
      "auth/web/reset_password",
      qs.stringify({ username, password })
    );
  },

  getAllWebAccount: async userID => {
    return await API.get(`/account/webAccount/${userID}`);
  }
};
