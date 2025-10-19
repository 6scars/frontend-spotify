import { useState } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import Signing from "./Signing/Signing.jsx"
import "./App.css";

import songs from "../public/data/songs.json";
import authors from "../public/data/authors.json";

export default function MiniSpotify() {
  const [song, setSong] = useState(null);
  const [author, setAuthor] = useState(null);
  const [show, setShow] = useState(false);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest')) || []);
  const [signing, setSigning] = useState(false)

  const signForm = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header setSigning={setSigning} signForm={signForm} />

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
      <Aside show={show} songs={songs} />
      {signing && <Signing signForm={signForm}/>}

    </>
  );
}
