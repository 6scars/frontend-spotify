import "./Aside.css";
import Playlists from './PlayLists'

export default function Aside({ show, songs, playlists }) {
  const choosePlaylist = (playlistId) => {
    console.log(playlistId);
  };
  return (
    <aside
      className={`leftBar red-scroll-bar fixed top-[89px] bottom-[0px] bg-gray-900 rounded-xl
            flex flex-col items-center gap-[10px] 
            overflow-y-auto
            ${show ? "show" : ""}`}
    >
       {playlists?.map((playlist) => (
        <Playlists
          key={playlist.id}
          playlist={playlist}
          choosePlaylist={choosePlaylist}
          songs={songs}
        />
      ))} 
    </aside>
  );
}
