import { createContext, useContext } from 'react';
import { useUIState } from '../hooks/useUIState';

const UIStateContext = createContext();

export function UIStateProvider({ children }) {
    const ui = useUIState();
    return (
        <UIStateContext.Provider value={ui}>
            {children}
        </UIStateContext.Provider>
    )
}


export function useUIStateContext(){
    return useContext(UIStateContext)
}