import Image from './Image'
export default function Songs({ SONGS, chooseSong }) {
  return (
    <div className="songs-container red-scroll-bar h-full">
      {SONGS.map((song) => {

        return (
          <div
            onClick={() => {
              chooseSong(song.song_id);
            }}
            key={song.song_id}
            className="song-container-outer bg-transparent flex justify-center"
          >
            <div className="song-container-inner  rounded-xl ">
              <Image song_image={song.song_image} />

              <div
                className="authors-container  h-[25%] text-gray-700 font-bold flex items-center
                        flex flex-col"
              >
                <div className=" text-[0.8rem] text-[var(--main-color)]">
                  {song.song_name}
                </div>
                <p className="  text-[0.7rem] authors__text ">
                  {song.author}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
