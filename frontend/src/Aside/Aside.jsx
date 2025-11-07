import "./Aside.css";
import Playlists from './PlayLists'

export default function Aside({ setPlaylists_id, show, songs, playlists, showCreatePlaylistWindow, setShowCreatePlaylistWindow, setShowPlaylistDescribing, isLogedIn, setSigning }) {
  const displayCreatingPlaylistWindow = () => {
    if (showCreatePlaylistWindow) {
      setShowCreatePlaylistWindow(false)
    } else {
      if (isLogedIn)
        setShowCreatePlaylistWindow(true)

      if (!isLogedIn)
        setSigning(true)

    }
  }

  const choosePlaylist = (playlist_id) => {
    setPlaylists_id(playlist_id);
    setShowPlaylistDescribing(true)
    /*--remove previous songs*/
  };
  return (
    <aside
      className={`leftBar red-scroll-bar fixed top-[89px] bottom-[0px] bg-gray-900 rounded-xl
            flex flex-col items-center gap-[10px] 
            overflow-y-auto
            ${show ? "show" : ""}`}
    >
      <div onClick={displayCreatingPlaylistWindow} className="text-nowrap text-[0.8rem] text-red-500 hover:text-white cursor-pointer">
        <span>create playlist</span>
      </div>
      {playlists?.map((playlist) => (
        <Playlists
          key={playlist.playlist_id}
          playlist={playlist}
          choosePlaylist={choosePlaylist}
          songs={songs}
        />
      ))}
    </aside>
  );
}
