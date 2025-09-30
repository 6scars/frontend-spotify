import "./Aside.css";
import Playlists from "./PlayLists";
import playlists from "../../public/data/playlists.json";
export default function Aside({ show, songs }) {
  const choosePlaylist = (playlistId) => {
    console.log(playlistId);
  };
  console.log(playlists[1].songsId);
  return (
    <aside
      className={`leftBar red-scroll-bar fixed top-[89px] bottom-[0px] bg-gray-900 rounded-xl
            flex flex-col items-center gap-[10px] 
            overflow-y-auto
            ${show ? "show" : ""}`}
    >
      {playlists.map((playlist) => (
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
