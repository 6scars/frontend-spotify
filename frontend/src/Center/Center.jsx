import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist.jsx"
import PlaylistDescribing from "./PlaylistDescribing.jsx";
import "./Center.css";
import { fetchSongs } from "../scripts/Fetches.jsx";
import { useEffect } from "react";
import { useUIStateContext } from "../contexts/UIStateContext.jsx";




export default function Center({
  setSONGS,
  SONGS,
  currentSong,

}) {

  const { show, showCreatePlaylistWindow, showPlaylistDescribing } = useUIStateContext();



  useEffect(() => {
    const fetches = async () => {
      setSONGS(await fetchSongs());
    }
    fetches();

  }, [])

  function choosenComponent() {
    if (showCreatePlaylistWindow) {
      return <CreatePlaylist SONGS={SONGS} />
    } else if (showPlaylistDescribing) {
      return <PlaylistDescribing />
    } else {return <Music SONGS={SONGS} />
    }

  }


  return (
    <main className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3 ${show ? "show" : ""} `} >

      <div className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
          relative " >
        {choosenComponent()}
      </div>

      {show ? <Description currentSong={currentSong} /> : ""}
    </main >
  );
}
