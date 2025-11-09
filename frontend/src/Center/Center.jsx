import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist.jsx"
import PlaylistDescribing from "./PlaylistDescribing.jsx";
import "./Center.css";
import { fetchSongs } from "../scripts/Fetches.jsx";

import { useEffect } from "react";




export default function Center({
  setSONGS,
  latest,
  SONGS,
  chooseSong,
  playlist_id,
  setCurrentSong,
  currentSong,
  setSong,
  setAuthor,
  show,
  setShow,
  showCreatePlaylistWindow,
  showPlaylistDescribing,
  setReloadAside,
  setCurrentPlaylist

}) {



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
      return (<PlaylistDescribing
        playlist_id={playlist_id}
        chooseSong={chooseSong}
        setCurrentPlaylist={setCurrentPlaylist}
        setCurrentSong={setCurrentSong} />)
    } else {
      return (<Music
        setCurrentSong={setCurrentSong}
        SONGS={SONGS}
        setSong={setSong}
        setAuthor={setAuthor}
        setShow={setShow}
        chooseSong={chooseSong}
        latest={latest}
      />)
    }

  }


  return (
    <main
      className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3  
        ${show ? "show" : ""}
        `}
    >
      <div
        className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
          relative
        "
      >
        {choosenComponent()}
      </div>

      <div
        className="description red-scroll-bar h-full flex-1 min-w-[500px] overflow-y-auto grow
        flex flex-col gap-[1.5rem]
      "
      >
        {show ? <Description currentSong={currentSong} /> : ""}
      </div>
    </main >
  );
}
