import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjIiLCJlbWFpbCI6Imd5ZmwyMzJAbmF2ZXIuY29tIiwiaWF0IjoxNzQxMTUyMDM0LCJleHAiOjE3NDE3NTY4MzR9.u_32R6ENdU09lC8jrDQ7vTOwnXBbMA_GS6gsHFJg0Q8";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
