import "./Music.css";
import Songs from "./Songs/Songs.jsx";
import Latest from "./Songs/Latest.jsx";
import { useCurrentPlaybackContext } from "../../contexts/CurrentPlaybackContext.jsx";


export default function Music({ songs }) {
  const { setCurrentPlaylistI, setCurrentPlaylist } = useCurrentPlaybackContext();

  function handleSwitchCurrentPlaylist() {
    setCurrentPlaylistI(null);
    setCurrentPlaylist([])
  }


  return (
    <>
      <div className="main-type w-full bg-gray-500 sticky top-0 flex gap-10" >
        <button>MUSIC</button>
        <button>PODCASTS</button>
      </div>
      <div className="main-songs ">
        <Latest handleSwitchCurrentPlaylist={handleSwitchCurrentPlaylist} />
        <div className="songs cursor-pointer">
          <div className="songs-title-container text-white font-bold">
            <p className="songs__title">Prepared for You</p>
          </div>
          <Songs songs={songs} handleSwitchCurrentPlaylist={handleSwitchCurrentPlaylist} />
        </div>
      </div>
    </>
  );
}
