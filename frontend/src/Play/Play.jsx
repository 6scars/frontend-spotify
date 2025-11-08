import { useEffect, useState, useRef } from "react";
import PlayCenterSection from "./PlayCenterSection.jsx";
import PlayRightSection from "./PlayRightSection.jsx";
import PlayLeftSection from "./PlayLeftSection.jsx";
import "./Play.css";

export default function Play( {currentSong, song, author, playlists, fetches, currentPlaylist}) {
  const [currentSongPlaylist_id, setCurrentSongPlaylist_id] = useState([])
  
  /*---------------- PLAYER CONTROLLER ----------------*/
  const audioRef = useRef(null);

  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const a = audioRef.current;

    const onLoaded = () => {
      setDuration(a.duration || 0);
    };
    const onPlay = () => setPlay(true);
    const onPause = () => setPlay(false);
    const onCurrent = () => setCurrent(a.currentTime);
    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onCurrent);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onCurrent);
    };
  }, []);

  function handleVolume(volume) {
    const a = audioRef.current;
    if (!a) return;
    if (volume <= 1) {
      a.volume = volume;
      setVolume(volume);
    }
  }

  function handlePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      setPlay(true);
      a.play();
    } else {
      setPlay(false);
      a.pause();
    }
  }

  function handleMute() {
    const a = audioRef.current;
    if (!muted) {
      setMuted(true);
      a.muted = true;
    } else {
      setMuted(false);
      a.muted = false;
    }
  }

  function handleLoop() {
    const a = audioRef.current;
    console.log(loop);
    if (!a) return;
    setLoop((prev) => {
      a.loop = !prev; // natywne API audio
      return !prev;
    });
  }
  currentPlaylist

  const progressBar = (current / duration) * 100;

  return (
    <div
      className="play fixed bottom-0 left-0 right-0 bg-black h-[120px]
      flex justify-between
    "
    >

      <PlayLeftSection currentSong={currentSong} song={song} author={author} playlists={playlists} fetches={fetches}/>

      <PlayCenterSection
        audioRef={audioRef}
        handlePlay={handlePlay}
        play={play}
        duration={duration}
        current={current}
        setCurrent={setCurrent}
        progressBar={progressBar}
        loop={loop}
        handleLoop={handleLoop}
        currentSong={currentSong}
        currentPlaylist={currentPlaylist}
      />

      <PlayRightSection
        volume={volume}
        handleVolume={handleVolume}
        muted={muted}
        handleMute={handleMute}
      />
    </div>
  );
}
