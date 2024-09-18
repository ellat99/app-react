import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { mealReducer } from '../reducers/mealReducer';
import { startFetchCategories } from '../actions/mealsActions';

const initialState = {
  categories: [], //lista de categorii
  categoryLoading: false, //starea de incarcare a categ
  categoryError: false, //starea de eroare la incarcarea categ
  categoryMeals: [], //lista de mese pt o categorie selectata
  categoryMealsLoading: false, //starea de incarcare a meselor dintr-o categorie
  categoryMealsError: false, //starea de eroare la incarcarea meselor dintr o categ
  meals: [], //lista de mese gnerale
  mealsLoading: false, //stare de incarcare a mancarii
  mealsError: false, //starea de eroare la incarcarea meselor
  meal: [], //detaliile unei mese specifice
  mealLoading: false, //starea de incarcare a detaliilor unei mese
  mealError: false, //stare de eroare la incarcarea detaliiilor unei mese
};

const MealContext = createContext({}); //un context global numit mealcontext care va furniza starea si functiile in componentele care au nevoie de ele
export const MealProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealReducer, initialState);
  //useRecucer-pt a gestiona modifc de stare
  //mealReducer-o functie care primeste starea curenta si o actiunesi returneaza o noua stare pe baza acelei actiuni.

  useEffect(() => {
    startFetchCategories(dispatch);
  }, []);
  //useEffect este utilizat pt a apela functia startFetchCategories imedia ce componenta este montata
  // startFetchCategories(dispatch)-Funcția declanșează acțiunea de încărcare a categoriilor și actualizează starea folosind dispatch
  return (
    <MealContext.Provider
      value={{
        ...state, //Furnizează starea completă în context
        dispatch, //Furnizează funcția dispatch pentru a trimite acțiuni
        startFetchCategories, // Furnizează funcția pentru a începe încărcarea categoriilor
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => {
  return useContext(MealContext);
};
