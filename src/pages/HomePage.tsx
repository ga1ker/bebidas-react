import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function HomePage() {
  const recipes = useAppStore((state) => state.recipes);
  const hasRecipes = useMemo(() => recipes.drinks.length > 0, [recipes]);

  return (
    <>
      <h1>Recetas</h1>

      {hasRecipes ? (
        <>
          <p>Sí hay recetas</p>

          {recipes.drinks.map((drink) => (
            <p key={drink.idDrink}>{drink.strDrink}</p>
          ))}
        </>
      ) : (
        <p>No hay recetas hermano</p>
      )}
    </>
  );
}