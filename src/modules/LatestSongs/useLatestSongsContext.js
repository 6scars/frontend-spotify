import { useContext } from "react";
import { LatestSongsContext } from "./LatestSongsContext.js";

export function useLatestSongsContext(){
    return useContext(LatestSongsContext)
}
