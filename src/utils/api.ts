import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjkiLCJlbWFpbCI6InRlc3QzQG5hdmVyLmNvbSIsImlhdCI6MTc0MTMxMDI0MywiZXhwIjoxNzQxOTE1MDQzfQ.f8ICeKUawFLEXHRAtXgQWkjgbvibKD7_7kYloGrUpRQ";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
