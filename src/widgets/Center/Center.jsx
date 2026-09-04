
import Description            from "./Description.jsx";
import CreatePlaylist         from "./CreatePlaylist/CreatePlaylist.jsx"
import PlaylistDescribing     from "./PlaylistDescribing.jsx";

import "./Center.css";

import { useUIStateContext }  from "../../modules/UIState/useUIStateContext.js";
import { useAuthContext }     from "../../modules/Auth/useAuthContext.js";
import { useMovingPanels }    from "./hooks/useMovingPanels.jsx"




export default function Center({ children }) {
  const { show, showCreatePlaylistWindow, showPlaylistDescribing } = useUIStateContext();
  const { songs } = useAuthContext();
  const { leftWidth, onMouseDown, rectObject } = useMovingPanels(68)

  const effectiveWidth = show ? leftWidth : 100;

  function choosenComponent() {
    if (showCreatePlaylistWindow)
      return <CreatePlaylist songs={songs} />
    else if (showPlaylistDescribing)
      return <PlaylistDescribing />
    else
      return children
  }

  return (
    <main
      className="Center"
      ref={rectObject} 
      style={{ '--center-primary-width': `${effectiveWidth}%` }}
     >
      <div className="music center-primary red-scroll-bar">
        {choosenComponent()}
      </div>
      {show ? <div aria-label="Zmień szerokość panelu" className="resizer" onMouseDown={onMouseDown} role="separator" /> : null}
      {show ? <Description /> : ""}
    </main >
  );
}
