
import { z } from "zod";
import axios from "axios";




const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await api.post("/auth/signup", { email, password });
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const verifyEmail = async (token: string) => {
  const res = await api.post("/auth/verify", { token });
  return res.data;
};

export const resetPassword = async (email: string) => {
  const res = await api.post("/auth/reset", { email });
  return res.data;
};


// ✅ Signup Schema
export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// You can also add:
export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6),
});


export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
