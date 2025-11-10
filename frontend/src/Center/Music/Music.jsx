import "./Music.css";
import Songs from "./Songs/Songs.jsx";
import Latest from "./Songs/Latest.jsx";

export default function Music({
  SONGS,
  songs,
  authors,
  latest,
  chooseSong,
  setCurrentPlaylist,
  setCurrentPlaylistI
}) {

  function handleSwitchCurrentPlaylist() {
    setCurrentPlaylistI(null);
    setCurrentPlaylist([])
  }


  return (
    <>
      <div
        className="main-type w-full bg-gray-500 sticky top-0 
            flex gap-10"
      >
        <button>MUSIC</button>
        <button>PODCASTS</button>
      </div>
      <div className="main-songs ">
        <Latest latest={latest} chooseSong={chooseSong} handleSwitchCurrentPlaylist={handleSwitchCurrentPlaylist}/>
        <div className="songs cursor-pointer">
          <div className="songs-title-container text-white font-bold">
            <p className="songs__title">Prepared for You</p>
          </div>
          <Songs SONGS={SONGS} songs={songs} authors={authors} chooseSong={chooseSong} handleSwitchCurrentPlaylist={handleSwitchCurrentPlaylist}/>
        </div>
      </div>
    </>
  );
}
