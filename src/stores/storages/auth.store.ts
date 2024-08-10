import { create, StateCreator } from "zustand";
import { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus,
  token?: string,
  User?: User

  loginUser: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuthStatus: () => Promise<void>
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthenticated",
  token: undefined,
  User: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password)
      set({ status: "authenticated", token, User: user })
    } catch (error) {
      set({ status: "unauthenticated", token: undefined, User: undefined })
      throw new Error("Unauthorized")
    }
  },

  logout: () => set({ status: "unauthenticated", token: undefined, User: undefined }),

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus()
      set({ status: "authenticated", token, User: user })
    } catch (error) {
      set({ status: "unauthenticated", token: undefined, User: undefined })
    }
  }
})

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      {
        name: "auth-storage"
      }
    )
  )
)
