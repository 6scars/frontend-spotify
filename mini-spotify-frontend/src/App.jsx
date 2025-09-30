import { useState} from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import "./App.css";

import songs from "../public/data/songs.json";
import authors from "../public/data/authors.json";

export default function MiniSpotify() {
  const [song, setSong] = useState(null);
  const [author, setAuthor] = useState(null);
  const [show, setShow] = useState(false);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest'))|| []);
  

  return (
    <>
      <Header />
      <Aside show={show} songs={songs} />
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
    </>
  );
}
