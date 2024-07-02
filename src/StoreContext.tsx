import { createContext, useContext } from 'react';
import AuthStore from './stores/authStore';

type Store = {
  authStore: AuthStore;
};

export const StoreContext = createContext<Store | null>(null);

export const useStores = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStores must be used within the store');
  }
  return store;
};
