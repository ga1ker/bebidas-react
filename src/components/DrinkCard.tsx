import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardProps){

    const selectRecipe = useAppStore(state => state.selectRecipe)

    return (
        <div className="border shadow-lg rounded-lg">
        <div className="overflow-hidden">
            <img 
            src={drink.strDrinkThumb} 
            alt={'Imagen de ' + drink.strDrink}
            className="hover:scale-105 transition-transform hover:rotate-1"
             />
        </div>
        <div className="p-5">
            <h2 className="text-2xl truncate font-black">
                {drink.strDrink}
            </h2>
            <button
                type="button"
                className="bg-green-400 hover:bg-green-500 mt-5 w-full p-3 font-bold text-white text-lg rounded-md"
                onClick={() => selectRecipe(drink.idDrink)}
                >Ver Receta</button>
        </div>
    </div>
    )
}