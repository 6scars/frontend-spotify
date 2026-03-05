import { useState } from "react";



export default function PlayLists({ playlist, choosePlaylist }) {
  const [loading, setLoading]   = useState(true)
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
    <div
      key={playlist.id}
      onClick={() => {
        choosePlaylist(playlist.playlist_id);
      }}
      className="playlists-container bg-red-700 w-[75%] min-h-[120px] cursor-pointer
            flex flex-col 
            border-solid rounded-md overflow-hidden
            hover:scale-120 transform duration-150
            hover:shadow-[10px_10px_5px_5px_rgba(0,0,0,0.50)]
            "
    >
      <div className={`img-container h-[70px] ${stringGrid}`}>
        {firstSongIds ? firstSongIds.map((_, i) => (
            <img
              key={playlist.song_ids[i]}
              alt="playlist"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${playlist.song_images[i]}`}
              onLoad={()=> setLoading(false)}
              className="h-full w-full object-cover"
            />  
        )):null}
      </div>
      <div className="playlist-paragraph-container w-full min-h-[50px] max-h-[50] flex items-center ">
        <p className="playlist__paragraph ">
          {playlist.playlist_name}
        </p>
      </div>
    </div>
  );
}
