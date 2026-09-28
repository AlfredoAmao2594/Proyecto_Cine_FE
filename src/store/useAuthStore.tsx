import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Role, Session } from '../types/api';

interface AuthData {
  token: string | null;
  name: string | null;
  email: string | null;
  role: Role | null;
  expiresAt: number | null;
}

interface AuthState extends AuthData {
  loginSuccess: (session: Session) => void;
  logout: () => void;
}

const initialData: AuthData = {
  token: null,
  name: null,
  email: null,
  role: null,
  expiresAt: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialData,

      loginSuccess: ({ token, name, email, role, expiresIn }) =>
        set({ token, name, email, role, expiresAt: Date.now() + expiresIn * 1000 }),

      logout: () => set(initialData),
    }),
    {
      name: 'cine-auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const selectIsAuthenticated = (state: AuthState): boolean =>
  Boolean(state.token) && Date.now() < (state.expiresAt ?? 0);