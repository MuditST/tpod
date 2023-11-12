import {create} from "zustand"
import { persist } from "zustand/middleware"

export const currentSong = create()(persist((set)=>({
    song: {"title":"","artist":"","released":null,"genre":[]},
    updateSong: (song) => set(()=>({song: song})),
}),{
    name: "song data name"
}))