import axios from "axios";

export const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  timeout: 15000,
});

// request interceptor for adding token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { status } = error.response;
    if (status === 403 || status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export function getJSON(url) {
  return API.get(url)
    .then((res) => res)
    .catch((error) => {
      throw error?.response?.data;
    });
}

export function postJSON(url, values) {
  return API.post(url, values)
    .then((res) => res)
    .catch((error) => {
      throw error?.response?.data;
    });
}

export function putJSON(url, values) {
  return API.put(url, values)
    .then((res) => res)
    .catch((error) => {
      throw error?.response?.data;
    });
}

export function patchJSON(url, values) {
  return API.patch(url, values)
    .then((res) => res)
    .catch((error) => {
      throw error?.response?.data;
    });
}

export function deleteJSON(url) {
  return API.delete(url)
    .then((res) => res)
    .catch((error) => {
      throw error?.response?.data;
    });
}
