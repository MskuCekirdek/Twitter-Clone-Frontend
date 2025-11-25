import axios from "axios";
import { useAuthStore } from "../_stores/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });

  const { data } = response.data;
  const { user, token } = data;
  useAuthStore.getState().setAuth(user, token);

  return response.data;
}

export async function register(
  email: string,
  username: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    username,
    password,
    firstName,
    lastName,
  });

  const { data } = response.data;
  const { user, token } = data;
  useAuthStore.getState().setAuth(user, token);
  return response.data;
}

export async function logout() {
  useAuthStore.getState().logout();
}
