import { create, type StateCreator } from "zustand"
import { customSessionStorage } from "../storages/session-storage.store"
import { persist } from "zustand/middleware"

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
}

const store: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName: string) => set({ firstName: firstName }),
  setLastName: (lastName: string) => set({ lastName: lastName }),
})

export const usePersonStore = create<PersonState & Actions>()(
  persist(
    store,
    {
      name: 'person-storage',
      storage: customSessionStorage
    }
  )
)