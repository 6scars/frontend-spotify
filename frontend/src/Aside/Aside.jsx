import { useCurrentPlaybackContext } from "../contexts/CurrentPlaybackContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useUIStateContext } from "../contexts/UIStateContext";
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
      <div onClick={displayCreatingPlaylistWindow} className="text-nowrap text-[0.8rem] text-red-500 hover:text-white cursor-pointer">
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
