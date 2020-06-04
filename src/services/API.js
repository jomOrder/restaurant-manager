import axios from "axios";
import qs from "qs";

let API = null;
const url = "http://13.250.39.193/api";
let accept = 'application/json';
API = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': accept,
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  };
  return config;
});
// var xhr = new XMLHttpRequest();
// let status = null;
// xhr.open("GET", url, true);
// xhr.onload = function (e) {
//   if (xhr.readyState === 4) {
//     status = xhr.status
//     if (xhr.status === 200) {
//       localStorage.setItem('isConnected', "true")
     
      
//     } else {
//       console.error(xhr.statusText);
//     }
//   }
// };
// xhr.onerror = async (e) => {
//   await localStorage.setItem('isConnected', "false")
//   console.error(xhr.statusText);
// };
// xhr.send({ status });



export default {
  createUser: async credentials => {
    return API.post(
      "/user/auth/web/register",
      credentials
    );
  },

  checkUser: async credentials => {
    return API.post(
      "/user/auth/web/check",
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
    return API.get('/merchant')
  },

  viewMerchant: async => {
    return API.get('/merchant/single')
  },

  /**
   * Related to merchant -> Branch - Create, Get
   */
  createBranch: async credentials => {
    accept = 'application/json';
    return API.post("/merchant/branch/create", credentials)
  },

  getMerchantBranches: async pageNo => {
    return API.get(`/merchant/branches?page=${pageNo}`);
  },

  /**
   * Related to merchant branch -> Category - Create, Get
   */

   viewSingleBranch: async branchKey => {
     return API.get(`/merchant/branches/single?branch_key=${branchKey}`); 
   },

  viewBranchCategory: async branchKey => {
    return API.get(`/merchant/branch/view/web/category?branch_key=${branchKey}`);
  },

  uploadBranchCategoryImg: async imageFile => {
    accept = `multipart/form-data`;
    let bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
    return API.post(`/merchant/branch/image/upload`, bodyFormData);
  },

  createBranchCategory: async (credentials, branchKey) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu?branchID=${branchKey}`, credentials);
  },

   /**
   * Related to merchant branch ->  Item - Create, Get
   */

  viewSingleCategory: async (categoryID, branchKey) => {
    return API.get(`/merchant/branch/view/web/category/single?categoryID=${categoryID}&branch_key=${branchKey}`); 
  },
  viewBranchCategoryItem: async (categoryID) => {
    return API.get(`/merchant/branch/view/web/category/item?categoryID=${categoryID}`);
  },

  uploadBranchCategoryItemImg: async imageFile => {
    accept = `multipart/form-data`;
    let bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
    return API.post(`/merchant/branch/image/upload`, bodyFormData);
  },

  createBranchCategoryItem: async (credentials, categoryID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item?categoryID=${categoryID}`, credentials);
  },


};
