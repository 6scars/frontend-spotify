import { useState, useEffect } from "react";

import Header       from "./Header/Header.jsx";
import Aside        from "./Aside/Aside.jsx";
import Center       from "./Center/Center.jsx";
import Play         from "./Play/Play.jsx";
import Signing      from "./Signing/Signing.jsx";
// import ErrorPopUp   from "./ErrorPopUp/ErrorPopUp.jsx";

import "./App.css";

import { useAuthContext }             from "./contexts/AuthContext.jsx";
import { useUIStateContext }          from "./contexts/UIStateContext.jsx";
import { useCurrentPlaybackContext }  from "./contexts/CurrentPlaybackContext.jsx";


export default function MiniSpotify() {
  const { isLogedIn, setIsLogedIn, playlists, fetchAuthState } = useAuthContext();
  const { signing, setShowCreatePlaylistWindow, setShowPlaylistDescribing, reloadAside, reloadApp, clickedAccount } = useUIStateContext();
  const { currentSong } = useCurrentPlaybackContext()

  useEffect(() => {
    setIsLogedIn(false);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)

    const fetch = async () => {
      await fetchAuthState()
    }
    fetch();
  }, [reloadAside, reloadApp]);


  return (
    <>
      <Header />
      <Center />
      {currentSong ? <Play /> : null}
      {playlists ? <Aside /> : null}
      {signing ? <Signing /> : null}

    </>
  );
}
