import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx"
import "./App.css";

import songs from "../public/data/songs.json";
import authors from "../public/data/authors.json";

export default function MiniSpotify() {
  const [token, setToken] = useState(null);
  const [song, setSong] = useState(null);
  const [author, setAuthor] = useState(null);
  const [show, setShow] = useState(false);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest')) || []);
  const [signing, setSigning] = useState(false)
  const [playlists, setPlaylists] = useState([]);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const dataUserResponse = await fetch('http://localhost:3005/api/checkIsLogedIn', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await dataUserResponse.json();
        console.log(data)
        if(data.token){
          setToken(data.token)
        }
      } catch (error) {
        console.error('Error fetching  dataUser:', error);
      }

    };
    const fetchPlaylists = async () => {
      try {
        const playlistsResponse = await fetch('http://localhost:3005/api/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(
            { id: 1 }
          )

        });
        const data = await playlistsResponse.json();
        const d = data.data
        setPlaylists(d)

      } catch (error) {
        console.error('Error fetching dataPlaylists:', error);
      }
    };
    fetchUser();
    fetchPlaylists();


  }, []);




  const clickedAccount = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header setSigning={setSigning} clickedAccount={clickedAccount} />

      <Center
        song={song}
        author={author}
        songs={songs}
        authors={authors}
        setSong={setSong}
        setAuthor={setAuthor}
        show={show}
        setShow={setShow}
        latest={latest}
        setLatest={setLatest}
      />
      {song ? <Play song={song} author={author} /> : ""}
      {playlists ? <Aside show={show} songs={songs} playlists={playlists} /> : null}
      {signing && <Signing clickedAccount={clickedAccount} />}

    </>
  );
}
