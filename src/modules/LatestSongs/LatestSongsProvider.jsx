import { LatestSongsContext } from "./LatestSongsContext.js";
import { useLatest } from "./useLatest.jsx";

export function LatestSongsProvider({ children }) {
    const latest = useLatest();
    return (
        <LatestSongsContext.Provider value={latest}>
            {children}
        </LatestSongsContext.Provider>
    )
}
