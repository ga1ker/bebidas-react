import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === "/", [pathname]);
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });

    const categories = useAppStore((state) => state.categories);
    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    
    let options = categories.drinks;

    useEffect(() => {
        fetchCategories();
    }, []);
    

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
      setSearchFilters({
        ...searchFilters, [e.target.name]: e.target.value
      })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if (Object.values(searchFilters).includes('')) {
            console.log('No dejar campos en blanco');
            return;
        }
        
        searchRecipes(searchFilters);
    }

    return (
      <header className={isHome ? 'bg-header bg-cover bg-center' : 'bg-slate-950'}>
          <div className="mx-auto container px-5 py-16">
              <div className="flex justify-between items-center">
                  <div>
                      <img className="w-32" src="/logo.svg" alt="logotipo" />
                  </div>
  
                  <nav className="flex gap-4">
                    <NavLink to={"/"} className={({ isActive }) => 
                        isActive ? "text-orange-200 uppercase hover:text-gray-200 font-bold backdrop-blur-md p-2 rounded-md" : "text-white uppercase hover:text-gray-200 font-bold p-2"
                    }>Home</NavLink>
                    <NavLink to={"/favorites"} className={({ isActive }) => 
                        isActive ? "text-orange-200 uppercase hover:text-gray-200 font-bold backdrop-blur-md p-2 rounded-md" : "text-white uppercase hover:text-gray-200 font-bold p-2"
                    }>Favoritos</NavLink>
                  </nav>
              </div>
              {
                    isHome && (
                        <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" 
                        onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <label 
                      htmlFor="ingredient"
                      className="block text-white uppercase font-extrabold text-lg">
                        Nombre o Ingredientes
                      </label>
                      <input 
                        id='ingredient'
                        type="text" 
                        onChange={handleChange}
                        name="ingredient"
                        className="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila Café"
                        />
                  </div>
                  <div className="space-y-4">
                    <label 
                      htmlFor="category"
                      className="block text-white uppercase font-extrabold text-lg">
                        Categoría
                      </label>
                      <select 
                        id='category'
                        onChange={handleChange}
                        name="category"
                        className="p-3 w-full rounded-lg focus:outline-none"
                        >
                          <option value="">-- Seleccione --</option>
                          {
                          options.map((option) => (
                            <option key={option.strCategory} value={option.strCategory}>
                            {option.strCategory}
                            </option>
                        ))
                        }
                        </select>
                  </div>
                  <input 
                    type="submit"
                    className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" 
                    value="Buscar Recetas" />
                </form>
                    )
              }
          </div>
      </header>
    )
  }