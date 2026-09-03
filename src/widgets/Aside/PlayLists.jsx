export default function PlayLists({ playlist, choosePlaylist }) {
  const song_ids                = playlist.song_ids;
  const lenthOfIds              = song_ids.length;

  let firstSongIds;
  let stringGrid;

    if(lenthOfIds >= 4){
      firstSongIds = song_ids[0] != 'NULL' ? song_ids.slice(0,4): 0;
      stringGrid = "grid grid-rows-2 grid-cols-2"
    }else if(lenthOfIds >= 3 ){
      firstSongIds = song_ids[0] != 'NULL' ? song_ids.slice(0,2): 0;
      stringGrid = "grid grid-rows-1 grid-cols-2"
    }else if(lenthOfIds >= 2){
      firstSongIds = song_ids[0] != 'NULL' ? song_ids.slice(0,1): 0;
      stringGrid = ""
    }else if(lenthOfIds <= 1){
      firstSongIds = song_ids[0] != 'NULL' ? song_ids.slice(0,1): 0;
      stringGrid = ""
    }
  




  return (
    <button
      onClick={() => {
        choosePlaylist(playlist.playlist_id);
      }}
      className="playlists-container"
      type="button"
    >
      <div className={`img-container ${stringGrid}`}>
        {firstSongIds ? firstSongIds.map((_, i) => (
            <img
              key={playlist.song_ids[i]}
              alt="playlist"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${playlist.song_images[i]}`}
              className="playlist__image"
            />  
        )):null}
      </div>
      <div className="playlist-paragraph-container">
        <span className="playlist__paragraph">
          {playlist.playlist_name}
        </span>
      </div>
    </button>
  );
}
