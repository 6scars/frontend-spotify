import { createContext, useContext } from 'react';
import { useUIState } from '../hooks/useUIState';

const UIStateContext = createContext();

export function UIStateProvider({ children }) {
    const ui = useUIState();
    return (
        <UIStateContext.provider value={ui}>
            {children}
        </UIStateContext.provider>
    )
}


export function useUIStateContext(){
    return useContext(UIStateContext)
}