import React, {createContext, useContext, useState} from "react";

const UserStoreContext = createContext();

export const UserStoreProvider = ({children}) => {
  const [credenciais, setCredenciais] = useState(null);

  const login = (dados, lembrar = false) => {
    setCredenciais(dados);
    if (lembrar) {
      localStorage.setItem('credenciais', JSON.stringify(credenciais));
    }
  }

  const logout = () => {
    setCredenciais(null);
    localStorage.removeItem('credenciais');
  }

  return (
    <UserStoreContext.Provider value={{ credenciais, login, logout }}>
      {children}
    </UserStoreContext.Provider>
  );
}

export const useUserStore = () => useContext(UserStoreContext);