import axios from "axios";
import { refreshToken } from "./authService";

export const API_URL = import.meta.env.VITE_API_URL;

export const axiosService = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const logout = () => {
  // Clear all auth-related localStorage items
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");

  // Redirect to login page
  window.location.href = "/login";
};

// Token refresh state
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      logout();
      return Promise.reject(new Error("No access token available"));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is not 401 or the request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }

    // If we're already refreshing, add the request to the queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return axiosService(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await refreshToken();
      if (response.token) {
        localStorage.setItem("access_token", response.token);
        // Update the authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        processQueue(null);
        return axiosService(originalRequest);
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (refreshError) {
      processQueue(refreshError);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
