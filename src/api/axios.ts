import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const BASE_URL =
  "https://rainbow-subsidiaries-governing-trademarks.trycloudflare.com/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

let isRefreshing = false;

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        refreshPromise = axios
          .post(`${BASE_URL}/admins/auth/refresh-access-token`, {
            refreshToken,
          })
          .then((response) => {
            const { admin, tokens } = response.data.data;

            localStorage.setItem("accessToken", tokens.accessToken);

            localStorage.setItem("refreshToken", tokens.refreshToken);

            localStorage.setItem("admin", JSON.stringify(admin));

            return tokens.accessToken;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const newAccessToken = await refreshPromise!;

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("accessToken");

      localStorage.removeItem("refreshToken");

      localStorage.removeItem("admin");

      window.location.replace("/login");

      return Promise.reject(refreshError);
    }
  },
);

export default api;
