export default function Songs({ songs, authors, chooseSong }) {
  return (
    <div className="songs-container red-scroll-bar h-full">
      {songs.map((song) => {
        const songAuthors = song.authors;
        const aut = authors.filter((author) => songAuthors.includes(author.id));

        return (
          <div
            onClick={() => {
              chooseSong(song.id);
            }}
            key={song.id}
            className="song-container-outer bg-transparent flex justify-center"
          >
            <div className="song-container-inner  rounded-xl ">
              <div className="song-image-container h-[75%] ">
                <img
                  className="song__image"
                  src={`mini-spotify/images/songPictures/${song.songImage}`}
                ></img>
              </div>

              <div
                className="authors-container  h-[25%] text-gray-700 font-bold flex items-center
                        flex flex-col"
              >
                <div className=" text-[0.8rem] text-[var(--main-color)]">
                  {song.songName}
                </div>
                <p className="  text-[0.7rem] authors__text ">
                  {aut.map((author) => author.author + ",")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
