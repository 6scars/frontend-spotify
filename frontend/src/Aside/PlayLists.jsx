export default function PlayLists({ playlist, choosePlaylist }) {

  const len = playlist.song_ids.length;
  return (
    <div
      key={playlist.id}
      onClick={() => {
        choosePlaylist(playlist.playlist_id);
      }}
      className="playlists-container bg-red-700 w-[75%] h-[150px] cursor-pointer
            flex flex-col
            "
    >
      <div className="img-container h-[70px] grid grid-rows-2 grid-cols-2 gap-[1px]">
        {Array.from({ length: len }).map((_, i) => (
          
            <img
              key={playlist.song_ids[i]}
              alt="playlist"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${playlist.song_images[i]}`}
              className="h-full w-full object-cover"
            />
            
          
        ))}





      </div>
      <div className="playlist-paragraph-container w-full">
        <p className="playlist__paragraph text-white text-[12px] font-bold text-bold text-center w-full">
          {playlist.playlist_name}
        </p>
      </div>
    </div>
  );
}
