import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";
import { checkToken, fetchPlaylists, addView } from "./scripts/Fetches.jsx";
import "./App.css";
import { useLatest } from "./hooks/useLatest.jsx";

import { useAuth } from "./hooks/useAuth.jsx"


export default function MiniSpotify() {
  /*currentSong keeps data about playling right now a song, shows Play Component*/
  const [currentSong, setCurrentSong] = useState(null);
  /*currentPlaylist keeps data about songs in the playlists, allows to play it in Play Component*/
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  /*currentPlaylistI saves current iteration/position in the currentPlaylist*/
  const [currentPlaylistI, setCurrentPlaylistI] = useState(null);
  /*show allows to controling when the Describe Component is displayed, changes styles in Center Component*/
  const [show, setShow] = useState(false);
  /*signing allows to controling when the Signing Component is displayed*/
  const [signing, setSigning] = useState(false)
  /*showCreatePlaylistWindow allows to controling when the CreatePlaylist Component is displayed*/
  const [showCreatePlaylistWindow, setShowCreatePlaylistWindow] = useState(false);
  /* showContentOfPlaylist allows to controling when the PlaylistDescribing Component is displayed*/
  const [showPlaylistDescribing, setShowPlaylistDescribing] = useState(false);
  /*reloadAside reloads Aside Component*/
  const [reloadAside, setReloadAside] = useState(false)
  /*reloadApp reloads App Component */
  const [reloadApp, setReloadApp] = useState(false)
  /*
    playlist_id allows to sending data from Aside Component to PlaylistDescripting Component,
    keeps playlist_id user have clicked
  */
  const [playlist_id, setPlaylists_id] = useState(null);
  /*user_id keeps user's id*/
  const user_id = Number(localStorage.getItem('user_id'))

  const [SONGS, setSONGS] = useState([]);
  const { latest, latestListened } = useLatest();
  const { isLogedIn, setIsLogedIn, playlists, setPlaylists, fetchAuthState } = useAuth();

  async function chooseSong(song_id) {
    const responde = await fetch(`http://localhost:3005/api/getSong?id=${song_id}`)
    const data = await responde.json();
    const findedSong = data.data[0];
    if (findedSong) {
      addView(song_id)
      setCurrentSong(findedSong)
      setShow(true)
      latestListened(findedSong)
    }
  }



  // const fetches = async () => {
  //   const isValidToken = await checkToken();
  //   setIsLogedIn(isValidToken);
  //   isValidToken ? setPlaylists(await fetchPlaylists(user_id)) : setPlaylists([])
  // }

  useEffect(() => {
    setIsLogedIn(false);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)
    fetchAuthState()
    // fetches()
  }, [reloadAside, reloadApp]);


  const clickedAccount = () => {
    signing ? setSigning(false) : setSigning(true)
  }


  /*--- RENDER COMPONENTS ---*/
  const renderHeaderC = () => {
    return (
      <Header
        clickedAccount={clickedAccount}
        isLogedIn={isLogedIn}
        setIsLogedIn={setIsLogedIn}
        setReloadApp={setReloadApp}
      />
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
