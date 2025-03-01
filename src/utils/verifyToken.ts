import { Tuser } from "@/types";
import { jwtDecode } from "jwt-decode";

export const verifiyToken = (token: any): Tuser => {
  return jwtDecode(token as string);
};
