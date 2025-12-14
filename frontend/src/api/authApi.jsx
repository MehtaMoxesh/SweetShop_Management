import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) =>
  axiosInstance.post("/auth/login", credentials);

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);

// Optional helper to fetch current user (if needed elsewhere)
export const getCurrentUser = () => axiosInstance.get("/auth/me");
