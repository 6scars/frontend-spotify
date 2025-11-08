import Music from "./Music/Music.jsx";
import Description from "./Description.jsx";
import CreatePlaylist from "./CreatePlaylist.jsx"
import PlaylistDescribing from "./PlaylistDescribing.jsx";
import "./Center.css";
import { useState, useEffect } from "react";
import { fetchSongs } from "../scripts/Fetches.jsx";
import { addView } from "../scripts/Fetches.jsx";




export default function Center({
  playlist_id,
  setCurrentSong,
  currentSong,
  setSong,
  setAuthor,
  show,
  setShow,
  showCreatePlaylistWindow,
  showPlaylistDescribing,
  setReloadAside,
  setCurrentPlaylist

}) {
  const [SONGS, setSONGS] = useState([]);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest')) || []);


  async function chooseSong(song_id) {
    const responde = await fetch(`http://localhost:3005/api/getSong?id=${song_id}`)
    const data = await responde.json();
    const findedSong = data.data[0];
    if (findedSong) {
      addView(song_id)
      setCurrentSong(findedSong)
      setShow(true)
      latestListened(findedSong)
    }
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
          localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }
        localStorage.setItem('latest', JSON.stringify([newSong, ...prev]));
        return [newSong, ...prev];
        /*if finded song in previous*/
      } else {
        /*if finded song and length equals 6*/
        if (prev.length === 6) {
          const newArray = [...prev];
          newArray.splice(index, 1);
          newArray.pop();
          localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
          return [newSong, ...newArray];
        }

        const newArray = [...prev];
        newArray.splice(index, 1);
        localStorage.setItem('latest', JSON.stringify([newSong, ...newArray]));
        return [newSong, ...newArray];
      }
    });
  }
  useEffect(() => {
    const fetches = async () => {
      setSONGS(await fetchSongs());

    }

    fetches();

  }, [])

  function choosenComponent() {
    if (showCreatePlaylistWindow) {
      return (<CreatePlaylist SONGS={SONGS} setReloadAside={setReloadAside} />)
    } else if (showPlaylistDescribing) {
      return (<PlaylistDescribing
        playlist_id={playlist_id}
        chooseSong={chooseSong}
        setCurrentPlaylist={setCurrentPlaylist}
        setCurrentSong={setCurrentSong} />)
    } else {
      return (<Music
        setCurrentSong={setCurrentSong}
        SONGS={SONGS}
        setSong={setSong}
        setAuthor={setAuthor}
        setShow={setShow}
        chooseSong={chooseSong}
        latest={latest}
      />)
    }

  }


  return (
    <main
      className={`Center fixed left-[116px] top-[89px] right-0  bottom-[0px] rounded-md 
        flex items-center gap-3  
        ${show ? "show" : ""}
        `}
    >{choosenComponent()}
      {show ? <Description currentSong={currentSong} /> : ""}
    </main>
  );
}
