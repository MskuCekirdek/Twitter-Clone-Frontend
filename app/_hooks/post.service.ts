import axios from "axios";
import { useAuthStore } from "../_stores/auth.store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createPost(content: string) {
  const token = useAuthStore.getState().token;

  const response = await axios.post(
    `${API_URL}/posts/create`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function getFeed(page = 1, limit = 10) {
  const response = await axios.get(`${API_URL}/feed`, {
    params: { page, limit },
  });
  return response.data;
}
