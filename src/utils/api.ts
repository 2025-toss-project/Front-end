import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const apiWithoutAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 400 에러(예: "Request failed with status code 400") 발생 시 refresh token 요청 후 재시도
// api.interceptors.response.use(
//   (response) => {
//     console.log("response interceptor 실행");
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 400 에러가 발생하고, 아직 재시도하지 않은 경우에 refresh token 로직 실행
//     if (
//       error.response &&
//       error.response.status === 400 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) {
//           console.error("refreshToken이 존재하지 않습니다.");
//           return Promise.reject(error);
//         }

//         // refresh endpoint 호출 (컨트롤러 기준: POST /token/refresh, Body: { "refreshToken": "..." })
//         const { data } = await apiWithoutAuth.post("/token/refresh", {
//           refreshToken,
//         });
//         console.log("Refresh 응답 데이터:", data);

//         // ApiResponse 형식: { success: true, message: "string", data: { accessToken: "새로운토큰" } }
//         if (data && data.success && data.data && data.data.accessToken) {
//           localStorage.setItem("accessToken", data.data.accessToken);
//           originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
//           return api(originalRequest);
//         } else {
//           console.error("access token을 찾을 수 없습니다. 응답 데이터:", data);
//           return Promise.reject(error);
//         }
//       } catch (refreshError) {
//         console.error("토큰 갱신 중 오류 발생:", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

