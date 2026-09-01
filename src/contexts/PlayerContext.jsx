import { createContext, useContext } from "react";
import { usePlayer } from "../hooks/usePlayer.jsx";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const player = usePlayer();
  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
