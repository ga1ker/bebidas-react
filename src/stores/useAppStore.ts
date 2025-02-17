import { create } from "zustand";
import { createRecipeSlice, RecipeSliceType } from "./recipeSlice";
import { devtools } from "zustand/middleware";
import { createFavoriteSlice, FavoriteSliceType } from "./favoritesSlice";


export const useAppStore = create<FavoriteSliceType & RecipeSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a)
})))