import { useLatestSongsContext }      from "../../../../contexts/LatestSongsContext";
import { usePlayerContext }           from "../../../../contexts/PlayerContext";
import LatestImg                      from "./LatestIMG";

export default function Latest({handleSwitchCurrentPlaylist }) {
  const { latest }        = useLatestSongsContext();
  const { chooseSong }    = usePlayerContext();
  

  return (
    <div className="play-lists gap-2 grid grid-cols-3">
      {(latest || []).map((l) => {
        return (
          <div key={l.id} className="playlist" onClick={() => { chooseSong(l.id); handleSwitchCurrentPlaylist() }}>
            <div className="playlist-image-container h-full">
              <LatestImg img={l.song_image}/>
            </div>
            <div className="playlist-title-container">
              <p className="playlist__title">{l.song_name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
