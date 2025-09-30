export default function Latest({latest}) {
  return (
    <div className="play-lists gap-2 grid grid-cols-3">
      {(latest || []).map((l) => {
        return (
          <div key={l.id} className="playlist ">
            <div className="playlist-image-container">
              <img
                className="playlist__image"
                src={`mini-spotify/images/songPictures/${l.songImage}`}
              ></img>
            </div>
            <div className="playlist-title-container">
              <p className="playlist__title">{l.songName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
