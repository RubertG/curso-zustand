import { create, type StateCreator } from "zustand"
import { persist } from "zustand/middleware"

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
}

const store: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName: string) => set(() => ({ firstName: firstName }), false, 'setFirstName'),
  setLastName: (lastName: string) => set(() => ({ lastName: lastName }), false, 'setLastName'),
})

export const usePersonStore = create<PersonState & Actions>()(
  // devtools(
    persist(
      store,
      {
        name: 'person-storage',
        // storage: firebaseStorage
      }
    )
  // )
)