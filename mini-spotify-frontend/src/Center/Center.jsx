import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import "./Center.css";



export default function Center({
  song,
  author,
  songs,
  authors,
  setSong,
  setAuthor,
  show,
  setShow,
  latest,
  setLatest
}) {
  return (
    <main
      className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3  
        ${show ? "show" : ""}
        `}
    >
      <Music
        songs={songs}
        authors={authors}
        setSong={setSong}
        setAuthor={setAuthor}
        setShow={setShow}
        latest={latest}
        setLatest={setLatest}
      />
      {show ? <Description song={song} author={author} /> : ""}
    </main>
  );
}
