import {createContext} from 'react';
import {useState} from 'react';

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    const [notify, setNotify] = useState('');
    const token = localStorage.getItem('token');
    const isLoggedIn = token ? true : false;
  return (
    <AppContext.Provider value={{notify, setNotify, token, isLoggedIn}}>
        {children}
    </AppContext.Provider>
  );
}