import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard";

export default function FavoritePage(){

    const favorites = useAppStore(state => state.favorites)
    const hasFavorites = useMemo(() => favorites.length > 0, [favorites]);



    return(
        <>
                <h1 className="text-6xl font-extrabold text-green-400">Favoritos</h1>
        
                {
                    hasFavorites? (
                        <>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 sm:grid-cols-1">
                            {
                                favorites.map(drink => (
                                    <DrinkCard
                                        drink={drink}
                                        key={drink.idDrink}
                                    />
                                ))
                            }
                        </div>
        
                        </>
                    ) : ( 
                        <p>No hay favoritos hermano, agregalos</p>
                    )
                }
        
                </>
    )
}