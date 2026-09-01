import { createContext, useContext } from "react";
import { useCurrentVariables } from "../hooks/useCurrentVariables";

const CurrentPlaybackContext = createContext();

export function CurrentPlaybackProvider({ children }) {
    const currentVariables = useCurrentVariables()
    return (
        <CurrentPlaybackContext.Provider value={currentVariables}>
            {children}
        </CurrentPlaybackContext.Provider>
    )
}


export function useCurrentPlaybackContext(){
    return useContext(CurrentPlaybackContext)
}