import {createContext} from 'react';
import {useState} from 'react';

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
    const [notify, setNotify] = useState('')
  return (
    <AppContext.Provider value={{notify, setNotify}}>
        {children}
    </AppContext.Provider>
  );
}