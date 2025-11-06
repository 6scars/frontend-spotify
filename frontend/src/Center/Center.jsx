import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist.jsx"
import PlaylistDescribing from "./PlaylistDescribing.jsx";
import "./Center.css";
import { useState, useEffect } from "react";
import { fetchSongs } from "../scripts/Fetches.jsx";



export default function Center({
  playlist_id,
  setCurrentSong,
  currentSong,
  setSong,
  setAuthor,
  show,
  setShow,
  showCreatePlaylistWindow,
  showPlaylistDescribing,
  setReloadAside

}) {
  const [SONGS, setSONGS] = useState([]);
  useEffect(() => {
    const fetches = async () => {
      setSONGS(await fetchSongs());
    }

    fetches();

  }, [])

  function choosenComponent() {
    if (showCreatePlaylistWindow) {
      return (<CreatePlaylist SONGS={SONGS} setReloadAside={setReloadAside} />)
    } else if (showPlaylistDescribing) {
      return (<PlaylistDescribing playlist_id={playlist_id} />)
    } else {
      return (<Music
        setCurrentSong={setCurrentSong}
        SONGS={SONGS}
        setSong={setSong}
        setAuthor={setAuthor}
        setShow={setShow}
      />)
    }

  }


  return (
    <main
      className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3  
        ${show ? "show" : ""}
        `}
    >{choosenComponent()}
      {show ? <Description currentSong={currentSong} /> : ""}
    </main>
  );
}
