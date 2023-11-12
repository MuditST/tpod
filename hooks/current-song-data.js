import {create} from "zustand"
import { persist } from "zustand/middleware"

export const currentSongData = create()(persist((set)=>({
    songData: [{"title":"","artist":"","released":null,"genre":[]}],
    updateSongData: (songData) => set(()=>({songData: songData})),
}),{
    name: "song data name"
}))