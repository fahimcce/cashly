export type TUserRole = "admin" | "user" | "agent";

export type Tuser = {
  identifier: string;
  role: TUserRole;
  iat: number;
};

export type TLogin = {
  identifier: string;
  password: string;
};
export type TSignup = {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  nid: string;
};

export type TSendMoney = {
  receiverPhone: string;
  amount: number;
  password: string;
};

export type TCashOut = {
  agentPhone: string;
  amount: number;
  password: string;
};
export type TCashIn = {
  userPhone: string;
  amount: number;
  password: string;
};
export type TMe = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  nid: string;
  isDeleted: boolean;
  balance: number;
  income: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface TTransaction {
  _id: string;
  senderPhone: string;
  receiverPhone: string;
  amount: number;
  transactionType: string;
  fee: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
