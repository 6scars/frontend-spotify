import { useEffect, useState, useRef } from "react";
import PlayCenterSection from "./PlayCenterSection.jsx";
import PlayRightSection from "./PlayRightSection.jsx";
import PlayLeftSection from "./PlayLeftSection.jsx";
import "./Play.css";

export default function Play({
  chooseSong,
  currentSong,
  song,
  author,
  playlists,
  fetches,
  currentPlaylist,
}) {
  const [currentPlaylistI, setCurrentPlaylistI] = useState(0);

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
    if (!a) return;

    const onLoaded = () => setDuration(a.duration || 0);

    const onEnded = () => {
      if (!currentPlaylist || currentPlaylist.length === 0) return;

      const isLast = currentPlaylistI === currentPlaylist.length - 1;
      const nextIndex = isLast ? 0 : currentPlaylistI + 1;

      const nextSong = currentPlaylist[nextIndex];
      if (nextSong && nextSong.song_id) {
        chooseSong(nextSong.song_id);
        setCurrentPlaylistI(nextIndex);
      }
    };

    const onPlay = () => setPlay(true);
    const onPause = () => setPlay(false);
    const onCurrent = () => setCurrent(a.currentTime);

    a.addEventListener("loadedmetadata", onLoaded);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onCurrent);
    a.addEventListener("ended", onEnded);

    return () => {
      a.removeEventListener("loadedmetadata", onLoaded);
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onCurrent);
      a.removeEventListener("ended", onEnded);
    };
  }, [currentPlaylistI, currentPlaylist, chooseSong]);

  function handleVolume(newVolume) {
    const a = audioRef.current;
    if (!a) return;
    if (newVolume >= 0 && newVolume <= 1) {
      a.volume = newVolume;
      setVolume(newVolume);
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
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  }

  function handleLoop() {
    const a = audioRef.current;
    if (!a) return;
    a.loop = !loop;
    setLoop(!loop);
  }

  function goToNextSong() {
    if (!currentPlaylist || currentPlaylist.length <= 0) return

    if (currentPlaylistI < currentPlaylist.length - 1) {
      const nextIndex = currentPlaylistI + 1;
      const nextSongId = currentPlaylist[nextIndex].song_id
      chooseSong(nextSongId)
      setCurrentPlaylistI(nextIndex)

    }
    if (currentPlaylistI === currentPlaylist.length - 1) {
      chooseSong(currentPlaylist[0].song_id)
      setCurrentPlaylistI(0)
    }
  }

  function goToPreviousSong() {
    if (!currentPlaylist || currentPlaylist.length <= 0 ) return

    let previousIndex = currentPlaylistI - 1;
    previousIndex = previousIndex < 0
      ? previousIndex = currentPlaylist.length - 1
      : previousIndex;

    if(previousIndex >= 0){
      chooseSong(currentPlaylist[previousIndex].song_id);
      setCurrentPlaylistI(previousIndex)
    }

    if(previousIndex >= currentPlaylist.length - 1) return
  }

  const progressBar = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div
      className="play fixed bottom-0 left-0 right-0 bg-black h-[120px]
      flex justify-between"
    >
      <PlayLeftSection
        currentSong={currentSong}
        song={song}
        author={author}
        playlists={playlists}
        fetches={fetches}
      />

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
        goToNextSong={goToNextSong}
        goToPreviousSong={goToPreviousSong}
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
