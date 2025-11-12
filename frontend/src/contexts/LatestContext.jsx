import { createContext, useContext } from "react";
import { useLatest } from "../hooks/useLatest";

const latestContext = createContext();

export function LatestProvider({ children }) {
    const latest = useLatest();
    return (
        <latestContext.provider value={latest}>
            {children}
        </latestContext.provider>
    )
}

export function useLatestContext(){
    return useContext(latestContext)
}