import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import qs from "qs";

export const ACCESS_TOKEN_HEADER_NAME = "Authorization";
export const ACCESS_TOKEN_HEADER_VALUE_PREFIX = "Bearer";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }),
  },
};

const liveInstance: AxiosInstance = axios.create(axiosRequestConfig);

const instance: AxiosInstance = liveInstance;

instance.interceptors.request.use(
  async (config) => {
    // const {
    //   auth: {accessToken},
    // } = store.getState();

    // if (accessToken) {
    //   config.headers[
    //     ACCESS_TOKEN_HEADER_NAME
    //   ] = ${ACCESS_TOKEN_HEADER_VALUE_PREFIX} ${accessToken};
    // }

    config.headers["Access-Control-Allow-Origin"] = "*";

    return config;
  },
  (error) => Promise.reject(error),
);

createAuthRefreshInterceptor(
  instance,
  (error) => {
    return Promise.reject(error);
  },
  {
    statusCodes: [401],
    pauseInstanceWhileRefreshing: true,
  },
);

export default instance;
