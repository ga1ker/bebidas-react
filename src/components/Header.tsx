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
    const camposVacios = useAppStore(state => state.showNotification);
    
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
          // TODO notificaciones
            console.log('No dejar campos en blanco');
            camposVacios({
              text: 'No dejar campos vacíos',
              error: true
            })
            return;
        }
        
        searchRecipes(searchFilters);
    }

    return (
      <header className={isHome ? 'bg-header bg-cover bg-center' : 'bg-green-800'}>
          <div className="mx-auto container px-5 py-16">
              <div className="flex justify-between items-center">
                  <div>
                      <img className="w-32 hue-rotate-90" src="/logo.svg" alt="logotipo" />
                  </div>
  
                  <nav className="flex gap-4">
                    <NavLink to={"/"} className={({ isActive }) => 
                        isActive ? "text-green-300 uppercase hover:text-gray-200 font-bold backdrop-blur-md p-2 rounded-md" : "text-white uppercase hover:text-gray-200 font-bold p-2"
                    }>Home</NavLink>
                    <NavLink to={"/favorites"} className={({ isActive }) => 
                        isActive ? "text-green-300 uppercase hover:text-gray-200 font-bold backdrop-blur-md p-2 rounded-md" : "text-white uppercase hover:text-gray-200 font-bold p-2"
                    }>Favoritos</NavLink>
                  </nav>
              </div>
              {
                    isHome && (
                        <form className="md:w-1/2 2xl:w-1/3 bg-green-400 my-32 p-10 rounded-lg shadow space-y-6" 
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
                    className="cursor-pointer bg-green-800 hover:bg-green-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" 
                    value="Buscar Recetas" />
                </form>
                    )
              }
          </div>
      </header>
    )
  }