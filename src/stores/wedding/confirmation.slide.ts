import { StateCreator } from "zustand"

export interface ConfirmationState {
  isConfirmed: boolean
  setIsConfirmed: (isConfirmed: boolean) => void
}

export const createConfirmationSlide: StateCreator<ConfirmationState> = (set) => ({
  isConfirmed: false,
  setIsConfirmed: (isConfirmed: boolean) => set({ isConfirmed }),
})