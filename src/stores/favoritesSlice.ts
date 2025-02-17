import { StateCreator } from "zustand"
import { Recipe } from "../types"

export type FavoriteSliceType = {
    favorites: Recipe[]
    addFavorites: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean;
}

export const createFavoriteSlice: StateCreator<FavoriteSliceType> = (set, get) => ({
    favorites: [],
    addFavorites: (recipe) => {
        if(get().favorites.some(d => d.idDrink === recipe.idDrink)){
            console.log('Ya existe esta bebida ', recipe);
            set({
                favorites: [...get().favorites.filter(d => d.idDrink !== recipe.idDrink)]
            })
            
        } else {
            console.log('Esta bebida es nueva por aquí ', recipe);
            set({
                favorites: [...get().favorites, recipe]
            })
        }
    },
    favoriteExist: (id) => {
        return get().favorites.some(d => d.idDrink === id)
    }
})