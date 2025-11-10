export default function Latest({latest, chooseSong, handleSwitchCurrentPlaylist}) {

  return (
    <div className="play-lists gap-2 grid grid-cols-3">
      {(latest || []).map((l) => {
        return (
          <div key={l.id} className="playlist" onClick={()=>{chooseSong(l.id) ; handleSwitchCurrentPlaylist()}}>
            <div className="playlist-image-container">
              <img
                className="playlist__image"
                src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${l.song_image}`}
              ></img>
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
