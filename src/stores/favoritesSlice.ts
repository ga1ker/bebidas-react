import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoriteSliceType = {
    favorites: Recipe[]
    addFavorites: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean;
    loadFavorites: () => void
}

export const createFavoriteSlice: StateCreator<FavoriteSliceType 
                                                & NotificationSliceType,
                                                [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    addFavorites: (recipe) => {
        if(get().favorites.some(d => d.idDrink === recipe.idDrink)){
            console.log('Ya existe esta bebida ', recipe);
            set({
                favorites: [...get().favorites.filter(d => d.idDrink !== recipe.idDrink)]
            })
            createNotificationSlice(set, get, api)
                .showNotification({
                    text: 'Se eliminó de favoritos',
                    error: false
                })
            
        } else {
            console.log('Esta bebida es nueva por aquí ', recipe);
            set({
                favorites: [...get().favorites, recipe]
            })
            createNotificationSlice(set, get, api)
                .showNotification({
                    text: 'Se agregó a favoritos',
                    error: false
                })
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(d => d.idDrink === id)
    },
    loadFavorites: () => {
        const dataStorage = localStorage.getItem('favorites')
        set({
            favorites: dataStorage? JSON.parse(dataStorage) : []
        })
    }
})