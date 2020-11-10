import axios from "axios";
// import qs from "qs";

let API = null;
let FPX = null;
const url = "https://api-core.jomorder.com.my/api";
let fpx = "https://fpxdemo.mobiversa.com/api"
let accept = 'application/json';
API = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': accept,
  }
});

FPX = axios.create({
  baseURL: fpx,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
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
   * Related to merchant branch -> Category - Create, Get Update, DELETE
   */

  viewSingleBranch: async branchKey => {
    return API.get(`/merchant/branches/single?branch_key=${branchKey}`);
  },

  updateBranchStatus: async (branchKey, status) => {
    return API.post(`/merchant/branch/update/status?branchID=${branchKey}&status=${status}`);
  },
  

  viewBranchCategory: async (branchKey, page) => {
    return API.get(`/merchant/branch/view/web/category?branch_key=${branchKey}&page=${page}`);
  },

  uploadBranchCategoryImg: async imageFile => {
    accept = `multipart/form-data`;
    let bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
    return API.post(`/merchant/branch/image/upload`, bodyFormData);
  },


  uploadMerchantImage: async (imageFile, name) => {
    accept = `multipart/form-data`;
    let bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);
    return API.post(`/merchant/image/upload?name=${name}`, bodyFormData);
  },

  createBranchCategory: async (credentials, branchKey) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu?branchID=${branchKey}`, credentials);
  },

  bulkCreateBranchCategory: async (credentials, branchKey) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/bulk?branchID=${branchKey}`, credentials);
  },

  updateSingleCategory: async (credentials, categoryID) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/update?categoryID=${categoryID}`, credentials);
  },

  removeSingleCategory: async (categoryID) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/remove?id=${categoryID}`);
  },

  updateSingleCategoryInStore: async (categoryID, in_store) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/in_store?categoryID=${categoryID}&in_store=${in_store}`);
  },



  /**
  * Related to merchant branch ->  Item - Create, Get, Update, DELETE
  */

  viewSingleCategory: async (categoryID, branchKey) => {
    return API.get(`/merchant/branch/view/web/category/single?categoryID=${categoryID}&branch_key=${branchKey}`);
  },
  viewBranchCategoryItem: async (categoryID) => {
    return API.get(`/merchant/branch/view/web/category/item?categoryID=${categoryID}&page=0`);
  },

  bulkCreateBranchCategoryItem: async (credentials, categoryID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/bulk?categoryID=${categoryID}`, credentials);
  },

  updateSingleCategoryItem: async (credentials, itemID) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/update?itemID=${itemID}`, credentials);
  },

  removeSingleCategoryItem: async (itemID) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/remove?id=${itemID}`);
  },

  updateSingleItemInStore: async (itemID, in_store) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/in_store?itemID=${itemID}&in_store=${in_store}`);
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

  /**
   * Add Ons Item
   */

  viewItemAddOn: async (itemID, page = 0) => {
    return API.get(`/merchant/branch/view/web/category/item/add-on?itemID=${itemID}&page=${page}`);
  },

  createItemAddOn: async (credentials, itemID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/add-on?itemID=${itemID}`, credentials);
  },

  bulkCreateItemAddOn: async (credentials, itemID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/add-on/bulk?itemID=${itemID}`, credentials);
  },


  updateItemAddOn: async (id, credentials) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/add-on/status?id=${id}`, credentials);
  },

  removeItemAddOn: async (id) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/add-on/remove?id=${id}`);
  },

  /**
   * Choose Item GET, UPDATE, DELETE, CREATE
   */

  viewChooseItem: async (itemID, page = 0) => {
    return API.get(`/merchant/branch/view/web/category/item/choose-item?itemID=${itemID}&&page=${page}`);
  },

  createChooseItem: async (credentials, itemID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/choose-item?itemID=${itemID}`, credentials);
  },

  updateChooseItem: async (id, credentials) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/choose-item/update?id=${id}`, credentials);
  },

  updateChooseItemStatus: async (id, credentials) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/choose-item/status?id=${id}`, credentials);
  },

  removeChooseItem: async (id) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/choose-item/remove?id=${id}`);
  },

  /**
   * Specia Request GET, UPDATE, DELETE, CREATE
   */

  viewSpecialRequest: async (itemID, page = 0) => {
    return API.get(`/merchant/branch/view/web/category/item/special-request?itemID=${itemID}&page=${page}`);
  },

  createSpecialRequest: async (credentials, itemID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/special-request?itemID=${itemID}`, credentials);
  },

  bulkCreateSpecialRequest: async (credentials, itemID) => {
    accept = 'application/json';
    return API.post(`/merchant/branch/menu/item/special-request/bulk?itemID=${itemID}`, credentials);
  },

  updateSpecialRequest: async (id, credentials) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/special-request/update?id=${id}`, credentials);
  },

  updateSpecialRequestStatus: async (id, credentials) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/special-request/status?id=${id}`, credentials);
  },

  removeSpecialRequest: async (id) => {
    accept = 'application/json';
    return API.put(`/merchant/branch/menu/item/special-request/remove?id=${id}`);
  },


  /**
   * Transactions GET
   */

  viewTransactions: async (branchID, page = 0) => {
    return API.get(`/transaction/merchant/branch/history?branchID=${branchID}&page=${page}&offset=100`);
  },

  /**
  * Analytics GET
  */

  viewAnalytics: async (branch_key) => {
    return API.get(`/merchant/analytics?branch_key=${branch_key}`);
  },

  /**
   * GET all FPX banks 
   * 
   */

  viewAllFPXBanks: async () => {
    return FPX.post('/fpx', {
      Service: "FULL_LIST"
    });
  },

};
