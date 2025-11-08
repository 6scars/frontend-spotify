import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx";
import { checkToken, fetchPlaylists } from "./scripts/Fetches.jsx";
import { fetchSongs } from "./scripts/Fetches.jsx";
import { addView } from "./scripts/Fetches.jsx";
import "./App.css";


export default function MiniSpotify() {
  /*currentSong keeps data about playling right now a song, shows Play Component*/
  const [currentSong, setCurrentSong] = useState(null);
  /*currentPlaylist keeps data about songs in the playlists, allows to play it in Play Component*/
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
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest')) || []);

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


  function latestListened(newSong) {
    if (!latest) setLatest([newSong]);

    const index = latest.findIndex((s) => s.id === newSong.id);

    setLatest((prev) => {
      /*if NOT finded song in previous*/
      if (index === -1) {
        /*if NOT finded song and length equals 6*/
        if (prev.length === 6) {
          const newArray = [...prev];
          newArray.pop();
          localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }
        localStorage.setItem('latest', JSON.stringify([newSong, ...prev]));
        return [newSong, ...prev];
        /*if finded song in previous*/
      } else {
        /*if finded song and length equals 6*/
        if (prev.length === 6) {
          const newArray = [...prev];
          newArray.splice(index, 1);
          newArray.pop();
          localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }

        const newArray = [...prev];
        newArray.splice(index, 1);
        localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
        return [newSong, ...newArray];
      }
    });
  }


  const fetches = async () => {
    const isValidToken = await checkToken();
    setIsLogedIn(isValidToken);
    isValidToken ? setPlaylists(await fetchPlaylists(user_id)) : setPlaylists([])
  }

  useEffect(() => {
    setIsLogedIn(false);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)
    fetches()
  }, [reloadAside, reloadApp]);

  console.log(currentPlaylist)

  const clickedAccount = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header
        clickedAccount={clickedAccount}
        isLogedIn={isLogedIn}
        setIsLogedIn={setIsLogedIn}
        setReloadApp={setReloadApp}
      />
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
      />
      {currentSong
        ? <Play
          currentSong={currentSong}
          playlists={playlists}
          setPlaylists={setPlaylists}
          fetches={fetches}
          currentPlaylist={currentPlaylist} />
        : ""
      }
      {playlists ? <Aside setPlaylists_id={setPlaylists_id}
        show={show}
        playlists={playlists}
        showCreatePlaylistWindow={showCreatePlaylistWindow}
        setShowCreatePlaylistWindow={setShowCreatePlaylistWindow}
        isLogedIn={isLogedIn}
        setSigning={setSigning}
        setShowPlaylistDescribing={setShowPlaylistDescribing} /> : null}
      {signing && <Signing setIsLogedIn={setIsLogedIn} clickedAccount={clickedAccount} isLogedIn={isLogedIn} />}

    </>
  );
}
