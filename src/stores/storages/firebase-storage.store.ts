import { createJSONStorage, StateStorage } from "zustand/middleware"

const FIREBASE_URL = "https://zustand-storage-curso-5c465-default-rtdb.firebaseio.com/zustand"

const sessionApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    const res = await fetch(`${FIREBASE_URL}/${name}.json`)
    const data = await res.json()

    return JSON.stringify(data)
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${FIREBASE_URL}/${name}.json`, {
      method: "PUT",
      body: value,
    })

    return
  },
  removeItem: function (name: string): void {
    console.log("removeItem", name)
  }
}

export const firebaseStorage = createJSONStorage(() => sessionApi)