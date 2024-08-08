import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bear {
  id: number,
  name: string
}

interface BearState {
  blackBeards: number
  polarBeards: number
  pandaBeards: number

  bears: Bear[]

  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void

  doNothing: () => void
  addBear: () => void
  clearBears: () => void


  totalBeards: () => number
}

const store: StateCreator<BearState> = (set, get) => ({
  blackBeards: 10,
  polarBeards: 5,
  pandaBeards: 1,

  bears: [{
    id: 1,
    name: 'Oso #1'
  }],

  totalBeards: () => get().blackBeards + get().polarBeards + get().pandaBeards + get().bears.length,

  increaseBlackBears: (by) => set((state) => ({ blackBeards: state.blackBeards + by })),
  increasePolarBears: (by) => set((state) => ({ polarBeards: state.polarBeards + by })),
  increasePandaBears: (by) => set((state) => ({ pandaBeards: state.pandaBeards + by })),

  doNothing: () => set((state) => ({ bears: [...state.bears] })),
  addBear: () => set((state) => ({
    bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
  })),
  clearBears: () => set({ bears: [] })
})

export const useBearStore = create<BearState>()(
  persist(
    store,
    {
      name: 'bears-storage'
    }
  )
)