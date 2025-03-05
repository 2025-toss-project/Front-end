import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const apiWithoutAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjIiLCJlbWFpbCI6ImFiY0BtYWlsLmNvbSIsImlhdCI6MTc0MTEzODcxOCwiZXhwIjoxNzQxNzQzNTE4fQ.1P1EnkNtOoJcJeWplqE4D-rcB_KHSL3esRqXAHRwt6o";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
