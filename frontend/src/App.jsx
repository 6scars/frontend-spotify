import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";

import "./App.css";

import { addView } from "./scripts/Fetches.jsx";
// import { useLatest } from "./hooks/useLatest.jsx";
// import { useAuth } from "./hooks/useAuth.jsx"
// import { useUIState } from "./hooks/useUIState.jsx";
// import { useCurrentVariables } from './hooks/useCurrentVariables.jsx'

import { useAuthContext } from "./contexts/AuthContext.jsx";
import { useLatestSongsContext } from "./contexts/LatestSongsContext.jsx";
import { useUIStateContext } from "./contexts/UIStateContext.jsx";
import { useCurrentPlaybackContext } from "./contexts/CurrentPlaybackContext.jsx";
import { usePlayerContext } from "./contexts/PlayerContext.jsx"


export default function MiniSpotify() {
  const [SONGS, setSONGS] = useState([]);




  const { latest, latestListened } = useLatestSongsContext();
  const { isLogedIn, setIsLogedIn, playlists, setPlaylists, fetchAuthState } = useAuthContext();
  const { signing, setSigning,
    showCreatePlaylistWindow, setShowCreatePlaylistWindow,
    showPlaylistDescribing, setShowPlaylistDescribing,
    reloadAside, setReloadAside,
    reloadApp, setReloadApp,
    show, setShow,
    clickedAccount } = useUIStateContext();

  const { currentSong, setCurrentSong,
    currentPlaylist, setCurrentPlaylist,
    currentPlaylistI, setCurrentPlaylistI,
    playlist_id, setPlaylists_id } = useCurrentPlaybackContext()

  const { chooseSong } = usePlayerContext();



  useEffect(() => {
    setIsLogedIn(false);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)
    fetchAuthState()
  }, [reloadAside, reloadApp]);





  /*--- RENDER COMPONENTS ---*/
  const renderHeaderC = () => {
    return (
      <Header />
    )
  }

  const renderCenterC = () => {
    return (
      <Center
        setSONGS={setSONGS}
        chooseSong={chooseSong}
        latest={latest}
        SONGS={SONGS}
        playlist_id={playlist_id}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        show={show}
        setShow={setShow}
        showCreatePlaylistWindow={showCreatePlaylistWindow}
        showPlaylistDescribing={showPlaylistDescribing}
        setReloadAside={setReloadAside}
        setCurrentPlaylist={setCurrentPlaylist}
        setCurrentPlaylistI={setCurrentPlaylistI}
      />
    )
  }

  const renderPlayC = () => {
    if (currentSong) {
      return (
        <Play
          currentSong={currentSong}
          playlists={playlists}
          setPlaylists={setPlaylists}
          fetches={fetchAuthState}
          currentPlaylist={currentPlaylist}
          chooseSong={chooseSong}
          setCurrentPlaylistI={setCurrentPlaylistI}
          currentPlaylistI={currentPlaylistI}
        />
      )
    } else {
      return null
    }
  }

  const renderAsideC = () => {
    if (playlists) {
      return (
        <Aside setPlaylists_id={setPlaylists_id}
          show={show}
          playlists={playlists}
          showCreatePlaylistWindow={showCreatePlaylistWindow}
          setShowCreatePlaylistWindow={setShowCreatePlaylistWindow}
          isLogedIn={isLogedIn}
          setSigning={setSigning}
          setShowPlaylistDescribing={setShowPlaylistDescribing} />
      )
    } else {
      return null
    }

  }

  const renderSigningC = () => {
    if (signing) {
      return (
        <Signing setIsLogedIn={setIsLogedIn} clickedAccount={clickedAccount} isLogedIn={isLogedIn} />
      )
    } else {
      null
    }
  }




  return (
    <>
      {renderHeaderC()}
      {renderCenterC()}
      {renderPlayC()}
      {renderAsideC()}
      {renderSigningC()}
    </>
  );
}
