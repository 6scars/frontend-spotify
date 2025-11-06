import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";
import { checkToken, fetchPlaylists } from "./scripts/Fetches.jsx";
import "./App.css";


export default function MiniSpotify() {
  /*currentSong keeps data about playling right now a song, shows Play Component*/
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  /*show allows to controling when the Describe Component is displayed, changes styles in Center Component*/
  const [show, setShow] = useState(false);
  /*signing allows to controling when the Signing Component is displayed*/
  const [signing, setSigning] = useState(false)
  /*playlists keeps information about the user' playlists rendered in Aside Component */
  const [playlists, setPlaylists] = useState([]);
  /*isLogedIn variable says does the user is loged in*/
  const [isLogedIn, setIsLogedIn] = useState(false);
  /*showCreatePlaylistWindow allows to controling when the CreatePlaylist Component is displayed*/
  const [showCreatePlaylistWindow, setShowCreatePlaylistWindow] = useState(false);
  /* showContentOfPlaylist allows to controling when the PlaylistDescribing Component is displayed*/
  const [showPlaylistDescribing, setShowPlaylistDescribing] = useState(false);
  /*reloadAside reload Aside Component*/
  const [reloadAside, setReloadAside] = useState(false)
  /*user_id keeps user's id*/
  const user_id = Number(localStorage.getItem('user_id'))

  useEffect(() => {
    const fetches = async () => {
      const isValidToken = await checkToken();
      setIsLogedIn(isValidToken);
      isValidToken ? setPlaylists(await fetchPlaylists(user_id)) : setPlaylists([])
    }
    fetches()
  }, [reloadAside]);




  const clickedAccount = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header
        clickedAccount={clickedAccount}
        isLogedIn={isLogedIn}
        setIsLogedIn={setIsLogedIn}
      />
      <Center
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        show={show}
        setShow={setShow}
        showCreatePlaylistWindow={showCreatePlaylistWindow}
        showPlaylistDescribing={showPlaylistDescribing}
        setReloadAside={setReloadAside}
      />
      {currentSong ? <Play currentSong={currentSong} /> : ""}
      {playlists ? <Aside show={show} playlists={playlists} showCreatePlaylistWindow={showCreatePlaylistWindow} setShowCreatePlaylistWindow={setShowCreatePlaylistWindow} isLogedIn={isLogedIn} setSigning={setSigning} setShowPlaylistDescribing={setShowPlaylistDescribing} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} /> : null}
      {signing && <Signing setIsLogedIn={setIsLogedIn} clickedAccount={clickedAccount} isLogedIn={isLogedIn} />}

    </>
  );
}
