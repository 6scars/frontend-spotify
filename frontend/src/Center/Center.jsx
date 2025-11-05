import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist.jsx"
import "./Center.css";
import { useState, useEffect } from "react";
import { fetchSongs } from "../scripts/Fetches.jsx";



export default function Center({
  setCurrentSong,
  currentSong,
  setSong,
  setAuthor,
  show,
  setShow,
  showCreatePlaylistWindow,
  setReloadAside,
  setSigning

}) {
  const [SONGS, setSONGS] = useState([]);
  useEffect(() => {
    const fetches = async () => {
      setSONGS(await fetchSongs());
    }

    fetches();

  }, [])




  return (
    <main
      className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3  
        ${show ? "show" : ""}
        `}
    >{showCreatePlaylistWindow ? <CreatePlaylist SONGS={SONGS} setReloadAside={setReloadAside}/> :
      <Music
        setCurrentSong={setCurrentSong}
        SONGS={SONGS}
        setSong={setSong}
        setAuthor={setAuthor}
        setShow={setShow}

      /> }
      {show ? <Description currentSong={currentSong} /> : ""}
    </main>
  );
}
