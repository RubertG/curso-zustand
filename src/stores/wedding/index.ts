import { create } from "zustand"
import { createPersonSlice, PersonSlice } from "./person.slice"
import { devtools, persist } from "zustand/middleware"
import { createGuestSlice, GuestSlice } from "./guest.slice"
import { createDateSlice, DateSlice } from "./date.slice"
import { ConfirmationState, createConfirmationSlide } from "./confirmation.slide"

type WeddingState = PersonSlice & GuestSlice & DateSlice & ConfirmationState

// crear el store 
export const useWeddingBoundStore = create<WeddingState>()(
  devtools(
    persist(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
        ...createConfirmationSlide(...a)
      }),
      { name: "wedding-storage" }
    )
  )
)