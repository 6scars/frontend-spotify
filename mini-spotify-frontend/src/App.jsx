import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import "./App.css";

export default function MiniSpotify() {
  console.log()
  const [song, setSong] = useState(null);
  const [author, setAuthor] = useState(null);
  const [show, setShow] = useState(false);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest'))|| []);
  

  return (
    <>
      <Header />
      <Aside show={show} />
      <Center
        song={song}
        author={author}
        setSong={setSong}
        setAuthor={setAuthor}
        show={show}
        setShow={setShow}
        latest={latest}
        setLatest={setLatest}
      />
      {song ? <Play song={song} author={author} /> : ""}
    </>
  );
}
