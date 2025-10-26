export default function PlayLeftSection({currentSong}) {
  
  return (
    <div className="play-left-section h-full w-[300px] min-w-[300px] max-w-[300px] flex">
      <div
        className="song-image-container w-[70px] h-full border-1
          flex
        "
      >
        <img
          alt="song-image"
          src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${currentSong.song_image}`}
          className=" h-full w-full object-cover rounded-md"
        />
      </div>

      <div
        className="title-authors border-1 flex-1 
          flex flex-col
        "
      >
        <a className="title text-white cursor-pointer hover:underline">
          {currentSong.song_name}
        </a>
        <a className="authors text-[var(--help-color)] cursor-pointer hover:underline ">
          {currentSong.author}
        </a>
      </div>
      <div className="flex  items-center">
        <img
            className="h-[35px] cursor-pointer"
          alt="add-to-favorite"
          src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/addToFavoriteSong.svg"
        />
      </div>
    </div>
  );
}
