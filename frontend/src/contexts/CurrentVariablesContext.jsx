import { createContext, useContext } from "react";
import { useCurrentVariables } from "../hooks/useCurrentVariables";

const CurrentVariablesContext = createContext();

export function CurrentVariableProvider({ children }) {
    const CurrentVariables = useCurrentVariables()
    return (
        <CurrentVariablesContext value={CurrentVariables}>
            {children}
        </CurrentVariablesContext>
    )
}


export function useCurrentVariableContext(){
    return useContext(CurrentVariablesContext)
}