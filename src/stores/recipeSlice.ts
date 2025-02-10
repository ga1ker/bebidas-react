import { StateCreator } from "zustand";
import { getCategories } from "../services/RecipeService";

type Category = {}

export type RecipeSliceType = {
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

export const createRecipeSlice: StateCreator<RecipeSliceType> = () => ({ 
    categories: [],
    fetchCategories: async () => {
        await getCategories();
    }
})