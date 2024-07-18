import React, {createContext, useContext, useEffect, useState} from "react";

const UserStoreContext = createContext();

export const UserStoreProvider = ({children}) => {
  const [credenciais, setCredenciais] = useState(null);

  useEffect(() => {
    const credenciaisArmazenadas = obtemCredenciaisArmazenadas();
    if (credenciaisArmazenadas) {
      setCredenciais(JSON.parse(credenciaisArmazenadas));
    }
  }, []);

  const login = (dados, lembrar = false) => {
    setCredenciais(dados);
    if (lembrar) {
      armazenaCredenciais(dados);
    }
  }

  const logout = () => {
    setCredenciais(null);
    localStorage.removeItem('credenciais');
  }

  const permaneceLogado = () => {
    return !!localStorage.getItem('credenciais');
  }

  const obtemCredenciaisArmazenadas = () => {
    return localStorage.getItem("credenciais");
  }
  const armazenaCredenciais = (dados) => {
    localStorage.setItem('credenciais', JSON.stringify(dados));
  }

  return (
    <UserStoreContext.Provider value={{ credenciais, login, logout, permaneceLogado }}>
      {children}
    </UserStoreContext.Provider>
  );
}

export const useUserStore = () => useContext(UserStoreContext);