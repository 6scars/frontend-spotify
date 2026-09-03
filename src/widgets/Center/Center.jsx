
import Music                  from "./Music/Music.jsx";
import Description            from "./Description.jsx";
import CreatePlaylist         from "./CreatePlaylist/CreatePlaylist.jsx"
import PlaylistDescribing     from "./PlaylistDescribing.jsx";

import "./Center.css";

import { useUIStateContext }  from "../../modules/UIState/useUIStateContext.js";
import { useAuthContext }     from "../../modules/Auth/useAuthContext.js";
import { useMovingPanels }    from "./hooks/useMovingPanels.jsx"




export default function Center() {
  const { show, showCreatePlaylistWindow, showPlaylistDescribing } = useUIStateContext();
  const { songs } = useAuthContext();
  const { leftWidth, onMouseDown, rectObject, leftObject } = useMovingPanels()

  const effectiveWidth = show ? leftWidth : 100;

  function choosenComponent() {
    if (showCreatePlaylistWindow)
      return <CreatePlaylist songs={songs} />
    else if (showPlaylistDescribing)
      return <PlaylistDescribing />
    else
      return <Music songs={songs}/>
  }

  return (
    <main 
      className={`Center ${show ? "show" : ""} `} 
      ref={rectObject} 
     >
      <div className="music red-scroll-bar" style={{flexBasis:`${effectiveWidth}%`}} ref={leftObject} >
        {choosenComponent()}
      </div>
      {show ? <div className="resizer"  onMouseDown={onMouseDown}/> : ""}
      {show ? <Description /> : ""}
    </main >
  );
}
