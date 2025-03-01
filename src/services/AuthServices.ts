import axiosInstance from "@/lib/axiosInstance";
import { TLogin, TSignup } from "@/types";

export const signUp = async (payload: TSignup) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Sign up failed.");
  }
  return response.data.data;
};

export const login = async (payload: TLogin) => {
  const response = await axiosInstance.post("/auth/login", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Login failed.");
  }
  return response.data.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/user/me");
  if (!response.data.success) {
    throw new Error(response.data.message || " failed.");
  }
  return response.data.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/user");
  if (!response.data.success) {
    throw new Error(response.data.message || " failed.");
  }
  return response.data.data;
};

export const toggleUserStatus = async (phone: string, status: boolean) => {
  const response = await axiosInstance.patch(`/user/status/${phone}`, {
    status,
  });
  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to update user status.");
  }
  return response.data.data;
};
