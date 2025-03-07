import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6IjciLCJlbWFpbCI6InRlc3QzQG5hdmVyLmNvbSIsImlhdCI6MTc0MTE2MzE1NywiZXhwIjoxNzQxNzY3OTU3fQ.in0CBAuUbYOyX_JvwtI-QzY77dYAmUWje-SC3P26DNo";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
