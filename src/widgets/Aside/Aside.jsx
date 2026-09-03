import { useCurrentPlaybackContext } from "../../modules/CurrentPlayback/useCurrentPlaybackContext.js";
import { useAuthContext } from "../../modules/Auth/useAuthContext.js";
import { useUIStateContext } from "../../modules/UIState/useUIStateContext.js";
import "./Aside.css";
import Playlists from './PlayLists'

export default function Aside() {
  const { show, showCreatePlaylistWindow, setShowCreatePlaylistWindow, setShowPlaylistDescribing, setSigning } = useUIStateContext();
  const { setPlaylists_id } = useCurrentPlaybackContext();
  const { playlists, isLogedIn } = useAuthContext();

  const displayCreatingPlaylistWindow = () => {
    if (showCreatePlaylistWindow) {
      setShowCreatePlaylistWindow(false)
      setShowPlaylistDescribing(false)
    } else {
      if (isLogedIn)
        setShowCreatePlaylistWindow(true)

      if (!isLogedIn)
        setSigning(true)
    }
  }

  const choosePlaylist = (playlist_id) => {
    setPlaylists_id(playlist_id);
    setShowPlaylistDescribing(true);
  };
  return (
    <aside
      className={`leftBar  red-scroll-bar  ${show ? "show" : ""}`}
    >
      <div onClick={displayCreatingPlaylistWindow} className="create_playlist_button">
        <span>create playlist</span>
      </div>
      {playlists?.map((playlist) => (
        <Playlists
          key={playlist.playlist_id}
          playlist={playlist}
          choosePlaylist={choosePlaylist}
        />
      ))}
    </aside>
  );
}
