
import { useEffect } from "react";

import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist/CreatePlaylist.jsx"
import PlaylistDescribing from "./PlaylistDescribing.jsx";

import "./Center.css";

import { useUIStateContext } from "../contexts/UIStateContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";




export default function Center() {
  const { show, showCreatePlaylistWindow, showPlaylistDescribing } = useUIStateContext();
  const { songs } = useAuthContext();

  function choosenComponent() {
    if (showCreatePlaylistWindow)
      return <CreatePlaylist songs={songs} />
    else if (showPlaylistDescribing)
      return <PlaylistDescribing />
    else
      return <Music songs={songs} />
  }

  return (
    <main className={`Center ${show ? "show" : ""} `} >
      <div className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
          relative " >
        {choosenComponent()}
      </div>
      {show ? <Description /> : ""}
    </main >
  );
}
