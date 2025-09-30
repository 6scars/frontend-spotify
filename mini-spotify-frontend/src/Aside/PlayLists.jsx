export default function PlayLists({ playlist, choosePlaylist, songs }) {
  const songsCompounds = playlist.songsId;
  const songsFinded = songs.filter((song) => songsCompounds.includes(song.id));
  console.log(songsFinded);
  return (
    <div
      key={playlist.id}
      onClick={() => {
        choosePlaylist(playlist.id);
      }}
      className="playlists-container bg-red-700 w-[75%] h-[150px] cursor-pointer
            flex flex-col
            "
    >
      <div className="img-container h-[70px] grid grid-rows-2 grid-cols-2 gap-[1px]">
        {Array.from({ length: 4 }).map((_, i) => {
          const song = songsFinded[i];

          return song ? (
            <img
              key={i}
              alt="playlist"
              src={`mini-spotify/images/songPictures/${songsFinded[i].songImage}`}
              className="h-full w-full object-cover"
            />
          ) : null;
        })}
      </div>
      <div className="playlist-paragraph-container w-full">
        <p className="playlist__paragraph text-white text-[12px] font-bold text-bold text-center w-full">
          {playlist.name}
        </p>
      </div>
    </div>
  );
}
