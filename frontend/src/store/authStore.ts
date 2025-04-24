// src/store/authStore.ts
import { create } from 'zustand';

type AuthState = {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  login: async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      console.log("✅ Login successful");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  },

  signup: async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      console.log("✅ Signup successful");
    } catch (error) {
      console.error("❌ Signup error:", error);
    }
  }
}));
