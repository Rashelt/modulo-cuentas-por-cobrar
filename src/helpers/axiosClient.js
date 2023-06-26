import axios from "axios";

export const API_URL = "http://localhost:5000";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// axiosApiInstance.interceptors.request.use(
//     async config => {
//         const value = await redisClient.get(rediskey)
//         const keys = JSON.parse(value)
//         config.headers = {
//             'Authorization': `Bearer ${keys.access_token}`,
//             'Accept': 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });

export function setToken(token) {
  axiosApi.defaults.headers.common["Authorization"] = token;
}

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  return axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
