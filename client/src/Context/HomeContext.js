import {createContext} from 'react';
import {useState} from 'react';

export const HomeContext = createContext({});

export const HomeProvider = ({children}) => {
    const [page, setPage] = useState('1')
  return (
    <HomeContext.Provider value={{page, setPage}}>
        {children}
    </HomeContext.Provider>
  );
}