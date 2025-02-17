import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
    const modal = useAppStore(state => state.modal);
    const closeModal = useAppStore(state => state.closeModal);
    const selectedRecipe = useAppStore(state => state.selectedRecipe);
    const addFavorites = useAppStore(state => state.addFavorites);
    const favoriteExist = useAppStore(state => state.favoriteExist);

    const renderIngredients = () =>{
        const ingredients : JSX.Element[] = []
        for (let i = 1; i <= 6; i++) {
            const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
            const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

            if(ingredient && measure){
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient} - {measure}
                    </li>
                )
        }
    }
    return ingredients;
}

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={ closeModal }>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {selectedRecipe.strDrink}
                                    </Dialog.Title>
                                    <img 
                                    src={selectedRecipe.strDrinkThumb} 
                                    alt={'Imagen de ' + selectedRecipe.strDrink} 
                                    className='mx-auto w-96'/>
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                    </Dialog.Title>

                                    {renderIngredients()}


                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                    Instrucciones
                                    </Dialog.Title>
                                    <p className='text-lg'>
                                        {selectedRecipe.strInstructions}
                                    </p>
                                    <div className='flex justify-between gap-4'>
                                        <button onClick={closeModal} className='bg-gray-400 hover:bg-gray-600 text-white font-bold p-2 rounded-md transition-colors' type='button'>Cerrar modal</button>
                                        <button onClick={() => {
                                            addFavorites(selectedRecipe)
                                            closeModal()
                                            }} className='bg-orange-400 hover:bg-orange-600 text-white p-2 rounded-md font-bold transition-colors' type='button'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.5">
                                            <path d="M17.286 21.09q -1.69 .001 -5.288 -2.615q -3.596 2.617 -5.288 2.616q -2.726 0 -.495 -6.8q -9.389 -6.775 2.135 -6.775h.076q 1.785 -5.516 3.574 -5.516q 1.785 0 3.574 5.516h.076q 11.525 0 2.133 6.774q 2.23 6.802 -.497 6.8"></path>
                                          </svg>{
                                            favoriteExist(selectedRecipe.idDrink)?
                                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                                <path d="M17.108 22.085c-1.266 -.068 -2.924 -.859 -5.071 -2.355l-.04 -.027l-.037 .027c-2.147 1.497 -3.804 2.288 -5.072 2.356l-.178 .005c-2.747 0 -3.097 -2.64 -1.718 -7.244l.054 -.178l-.1 -.075c-6.056 -4.638 -5.046 -7.848 2.554 -8.066l.202 -.005l.115 -.326c1.184 -3.33 2.426 -5.085 4.027 -5.192l.156 -.005c1.674 0 2.957 1.76 4.182 5.197l.114 .326l.204 .005c7.6 .218 8.61 3.428 2.553 8.065l-.102 .075l.055 .178c1.35 4.512 1.04 7.137 -1.556 7.24l-.163 .003z"></path>
                                            </svg> Quitar de `:
                                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.5">
                                                <path d="M17.286 21.09q -1.69 .001 -5.288 -2.615q -3.596 2.617 -5.288 2.616q -2.726 0 -.495 -6.8q -9.389 -6.775 2.135 -6.775h.076q 1.785 -5.516 3.574 -5.516q 1.785 0 3.574 5.516h.076q 11.525 0 2.133 6.774q 2.23 6.802 -.497 6.8"></path>
                                            </svg> Agregar a `
                                    }Favoritos</button>
                                    </div>
        
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}