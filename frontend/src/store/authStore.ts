// src/store/authStore.ts
import { create } from 'zustand';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  setToken: (token: string | null) => void;
  logout: () => void;
  initialize: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  loading: true,

  // Set token in store + localStorage
  setToken: (token) => {
    if (token) {
      localStorage.setItem('access_token', token); // ✅ store token correctly
    } else {
      localStorage.removeItem('access_token');
    }
    set({
      token,
      isAuthenticated: !!token,
    });
  },

  login: async (email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await res.json();
      const token = data.access_token;

      if (token) {
        localStorage.setItem('access_token', token); // ✅ ensure consistent key
        set({
          token,
          isAuthenticated: true, // ✅ immediately update state
        });
        console.log("✅ Login successful");
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Backend doesn't use 'name'
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Signup failed');
      }

      const data = await res.json();
      const token = data.access_token;

      if (token) {
        localStorage.setItem('access_token', token);
        set({
          token,
          isAuthenticated: true,
        });
        console.log("✅ Signup successful");
      } else {
        throw new Error('No token received from signup');
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    set({
      token: null,
      isAuthenticated: false,
    });
  },

  initialize: () => {
    const storedToken = localStorage.getItem('access_token'); // ✅ correct key used here
    set({
      token: storedToken,
      isAuthenticated: !!storedToken,
      loading: false,
    });
  }
}));
