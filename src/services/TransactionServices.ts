import axiosInstance from "@/lib/axiosInstance";
import { TCashIn, TCashOut, TSendMoney } from "@/types";

export const BalanceInquiry = async () => {
  const response = await axiosInstance.get("/transaction/balance-inquiry");
  if (!response.data.success) {
    throw new Error(response.data.message || "Sign up failed.");
  }
  return response.data.data;
};

export const sendMoney = async (payload: TSendMoney) => {
  const response = await axiosInstance.post("/transaction/send-money", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Send Money failed.");
  }
  return response.data.data;
};
export const cashOut = async (payload: TCashOut) => {
  const response = await axiosInstance.post("/transaction/cash-out", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Cash out failed.");
  }
  return response.data.data;
};

export const cashIn = async (payload: TCashIn) => {
  const response = await axiosInstance.post("/transaction/cashin", payload);
  if (!response.data.success) {
    throw new Error(response.data.message || "Cash in failed.");
  }
  return response.data.data;
};

export const get100Transaction = async () => {
  const response = await axiosInstance.get("/transaction/transactions");
  if (!response.data.success) {
    throw new Error(response.data.message || " failed.");
  }
  return response.data.data;
};

export const totalMoney = async () => {
  const response = await axiosInstance.get("/transaction/total-money");
  if (!response.data.success) {
    throw new Error(response.data.message || " failed.");
  }
  return response.data.data;
};

export const GetAllTransaction = async () => {
  const response = await axiosInstance.get("/admin/transactions");
  if (!response.data.success) {
    throw new Error(response.data.message || " failed.");
  }
  return response.data.data;
};
