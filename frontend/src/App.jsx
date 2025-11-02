import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";
import { checkToken, fetchPlaylists } from "./scripts/Fetches.jsx";
import "./App.css";


export default function MiniSpotify() {
  const [currentSong, setCurrentSong] = useState(null);
  const [show, setShow] = useState(false);
  const [signing, setSigning] = useState(false)
  const [playlists, setPlaylists] = useState([]);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [showCreatePlaylistWindow, setShowCreatePlaylistWindow] = useState(false);

  const user_id = Number(localStorage.getItem('user_id'))



  useEffect(() => {
    const fetches = async () => {
      setIsLogedIn(await checkToken());
      setPlaylists(await fetchPlaylists(user_id))
    }
    fetches()
  }, []);




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
      />
      {currentSong ? <Play currentSong={currentSong} /> : ""}
      {playlists ? <Aside show={show} playlists={playlists} showCreatePlaylistWindow={showCreatePlaylistWindow} setShowCreatePlaylistWindow={setShowCreatePlaylistWindow} /> : null}
      {signing && <Signing setIsLogedIn={setIsLogedIn} clickedAccount={clickedAccount} isLogedIn={isLogedIn} />}

    </>
  );
}
