import React, { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers/sidebarReducer';
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../actions/actions';

const initialState = {
  isSidebarOpen: false, //sidebarul e inchis la inceput
};

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  //reducer este funcția care primește starea curentă și o acțiune și returnează o nouă stare pe baza acțiunii primite.
  const [state, dispatch] = useReducer(reducer, initialState);
  //Această funcție trimite o acțiune cu tipul OPEN_SIDEBAR către reducer, care va actualiza starea pentru a deschide sidebar-ul.
  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
