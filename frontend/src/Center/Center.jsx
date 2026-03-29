
import Music                  from "./Music/Music.jsx";
import Description            from "./Description.jsx";
import CreatePlaylist         from "./CreatePlaylist/CreatePlaylist.jsx"
import PlaylistDescribing     from "./PlaylistDescribing.jsx";

import "./Center.css";

import { useUIStateContext }  from "../contexts/UIStateContext.jsx";
import { useAuthContext }     from "../contexts/AuthContext.jsx";
import { useMovingPanels }    from "../hooks/useMovingPanels.jsx"




export default function Center() {
  const { show, showCreatePlaylistWindow, showPlaylistDescribing } = useUIStateContext();
  const { songs } = useAuthContext();
  const { leftWidth, onMouseDown, rectObject, leftObject } = useMovingPanels()

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
      <div className="music red-scroll-bar" style={{flexBasis:`${leftWidth}%`}} ref={leftObject} >
        {choosenComponent()}
      </div>
      {show ? <div className="resizer"  onMouseDown={onMouseDown}/> : ""}
      {show ? <Description /> : ""}
    </main >
  );
}
