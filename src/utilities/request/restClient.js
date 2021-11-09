let { config } = require('../../constants')
let axios = require("axios");

const axiosInstance = axios.create({
  baseURL: config.dev.baseURL
})

axiosInstance.interceptors.request.use(
  (requestConfig) => {
    let token = localStorage.getItem("token");
    let tempToken = localStorage.getItem("tempToken");
    if(!token){
      requestConfig.headers["Authorization"] = `Bearer ${tempToken}`;
    } else {
      requestConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(requestConfig);
    return requestConfig;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);
function getService(url) {
  return axiosInstance.get(url)
    // .then(function (response) {
    //   console.log("Response-----------", response);
    //   return response;
    // })
    // .catch(function (error) {
    //   console.log("Error-----------", error);
    //   return error;
    // });
}

function postService(url, params) {
  return axiosInstance.post(url, params);
}

function putService(url, params) {
  // axios.put(url, params)
  axiosInstance
    .request({
      url: url,
      method: "PUT",
      data: params,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

function deleteService(url, params) {
  // axios.delete(url, { data: params })
  axiosInstance
    .request({
      url: url,
      method: "DELETE",
      data: params,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = {
  getService: getService,
  postService: postService,
  putService: putService,
  deleteService: deleteService,
};
