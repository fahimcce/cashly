import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken");

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;

// response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
    }

    return Promise.reject(error);
  }
);
