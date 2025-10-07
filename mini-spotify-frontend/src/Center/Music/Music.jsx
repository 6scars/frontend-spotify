import "./Music.css";
import Songs from "./Songs.jsx";
import Latest from "./Latest.jsx";
export default function Music({
  songs,
  authors,
  setSong,
  setAuthor,
  setShow,
  latest,
  setLatest,
}) {
  function chooseSong(e) {
    const findedSong = songs.find((song) => song.id === e);
    const findedAuthor = authors.find(
      (author) => author.id === findedSong.authors[0]
    );
    setSong(findedSong);
    setAuthor(findedAuthor);
    setShow(true);
    latestListened(findedSong);
  }


  function latestListened(newSong) {
    if (!latest) setLatest([newSong]);

    const index = latest.findIndex((s) => s.id === newSong.id);

    setLatest((prev) => {
      /*if NOT finded song in previous*/
      if (index === -1) {
        /*if NOT finded song and length equals 6*/
        if (prev.length === 6) {
          const newArray = [...prev];
          newArray.pop();
          localStorage.setItem('latest',JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }
         localStorage.setItem('latest',JSON.stringify([newSong, ...prev]));
        return [newSong, ...prev];
        /*if finded song in previous*/
      } else {
        /*if finded song and length equals 6*/
        if (prev.length === 6) {
          const newArray = [...prev];
          newArray.splice(index, 1);
          newArray.pop();
          localStorage.setItem('latest',JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }

        const newArray = [...prev];
        newArray.splice(index, 1);
        localStorage.setItem('latest',JSON.stringify([newSong, ...newArray]));
        return [newSong, ...newArray];
      }
    });
  }

  return (
    <div
      className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
          relative
        "
    >
      <div
        className="main-type w-full bg-gray-500 sticky top-0 
            flex gap-10"
      >
        <button>MUSIC</button>
        <button>PODCASTS</button>
      </div>

      <div className="main-songs ">
        <Latest latest={latest} />
        
        {Array.from({ length: 4 }).map((_, i) => {
          return (
            <div key={i} className="songs cursor-pointer">
              <div className="songs-title-container text-white font-bold">
                <p className="songs__title">Prepared for You</p>
              </div>
              <Songs songs={songs} authors={authors} chooseSong={chooseSong} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
