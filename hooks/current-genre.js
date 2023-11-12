import {create} from "zustand"
import {persist} from "zustand/middleware"
export const currentGenre = create()(persist((set)=>({
    genre: "",
    updateGenre: (genre) => set(()=>({genre: genre})),
   
}),{
    name: "genre name"
}))