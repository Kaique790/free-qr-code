import { clientEnv } from "@/env/client";
import axios from "axios";

export const api = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
