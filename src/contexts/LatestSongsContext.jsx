import { createContext, useContext } from "react";
import { useLatest } from "../hooks/useLatest";

const latestContext = createContext();

export function LatestSongsProvider({ children }) {
    const latest = useLatest();
    return (
        <latestContext.Provider value={latest}>
            {children}
        </latestContext.Provider>
    )
}

export function useLatestSongsContext(){
    return useContext(latestContext)
}