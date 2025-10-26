import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";
import { checkToken, fetchPlaylists } from "./scripts/Fetches.jsx";
import "./App.css";

import songs from "../public/data/songs.json";
import authors from "../public/data/authors.json";

export default function MiniSpotify() {
  const [currentSong, setCurrentSong] = useState(null);
  const [show, setShow] = useState(false);
  const [signing, setSigning] = useState(false)
  const [playlists, setPlaylists] = useState([]);
  const [isLogedIn, setIsLogedIn] = useState(false);

  



  useEffect(() => {
    const id = 1;
    const fetches = async () => {
      setIsLogedIn(await checkToken());
      setPlaylists(await fetchPlaylists(id))
    }

    fetches()
    
  }, []);




  const clickedAccount = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header clickedAccount={clickedAccount} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
      <Center 
        currentSong = {currentSong}
        setCurrentSong = {setCurrentSong}
        show={show}
        setShow={setShow}
      />
      {currentSong ? <Play currentSong={currentSong}  /> : ""}
      {playlists ? <Aside show={show} songs={songs} playlists={playlists} /> : null}
      {signing && <Signing clickedAccount={clickedAccount} />}

    </>
  );
}
