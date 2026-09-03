import { CurrentPlaybackContext } from "./CurrentPlaybackContext.js";
import { useCurrentVariables } from "./useCurrentVariables.jsx";

export function CurrentPlaybackProvider({ children }) {
    const currentVariables = useCurrentVariables()
    return (
        <CurrentPlaybackContext.Provider value={currentVariables}>
            {children}
        </CurrentPlaybackContext.Provider>
    )
}
