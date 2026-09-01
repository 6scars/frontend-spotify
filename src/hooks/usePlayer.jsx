// src/hooks/usePlayer.jsx
import { useState, useRef, useEffect } from "react";
import { addView } from "../scripts/Fetches.jsx";
import { useCurrentPlaybackContext } from "../contexts/CurrentPlaybackContext.jsx";
import { useLatestSongsContext } from "../contexts/LatestSongsContext.jsx";
import { useUIStateContext } from "../contexts/UIStateContext.jsx";

export function usePlayer() {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  const { currentPlaylist, currentPlaylistI, currentSong, setCurrentSong, setCurrentPlaylistI } = useCurrentPlaybackContext();
  const { latestListened } = useLatestSongsContext();
  const { setShow } = useUIStateContext();

  // --- attach audio listeners ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => goToNext();
    const onLoadeddata = () => { audio.play(); setIsPlaying(true); if (!audio) handleError(`onLoadeddata event error in usePlayer component`) }

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadeddata", onLoadeddata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener('onLoadeddata', onLoadeddata)
    };
    // note: audioRef.current is not a valid dependency, listeners are attached when audio exists and effect runs
  }, [currentSong, currentPlaylist]);

  // --- playback controls ---
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => { });
    else audio.pause();
  };

  const setAudioVolume = (v) => {
    const audio = audioRef.current;
    if (!audio) return;
    const vol = Math.min(Math.max(v, 0), 1);
    audio.volume = vol;
    setVolume(vol);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const toggleLoop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = !loop;
    setLoop(!loop);
  };

  const goToNext = async () => {
    /*---------------------EARLY RETURN---------------------*/
    if (currentPlaylist.length <= 0) {  /*-- there is no songs in the currentPlaylist array --*/
      handleError(`there is no currentPlaylist`)
      return null
    }
    

    /*---------------------VARIABLES---------------------*/
    const prevIndex = currentPlaylistI;
    const playlistLen = currentPlaylist.length - 1;

    let newIndex = prevIndex + 1;
    let newSongId;


    /*---------------------EDGE CASES---------------------*/
    /*--when newIndex is at BEGINNING of the array or almost at the end of the array--*/
    if (newIndex <= playlistLen) {  
      const newSong = currentPlaylist[newIndex];
      newSongId = newSong.song_id;

      if (!newSongId)
        handleError(`there is no newSongId chooseSong function`, true)
    } else if (newIndex > playlistLen) { /*--when newIndex is at END of the array --*/
      newIndex = 0;
      const newSong = currentPlaylist[newIndex];
      newSongId = newSong.song_id;

      if (!newSongId)
        handleError(`there is no newSongId chooseSong function `, true)
    }


    /*---------------------FINAL EXECUTION---------------------*/
    setCurrentPlaylistI(newIndex)
    await chooseSong(newSongId)

    return null
  };

  const goToPrevious = async () => {
    /*---------------------EARLY RETURN---------------------*/
    if (currentPlaylist.length <= 0) { /*-- there is no songs in the currentPlaylist array --*/
      handleError(`there is no currentPlaylist`)
      return null
    }

     /*---------------------VARIABLES---------------------*/
    const prevIndex = currentPlaylistI;
    const playlistLen = currentPlaylist.length - 1;

    let newIndex = prevIndex - 1;
    let newSongId;



    /*---------------------EDGE CASES---------------------*/
    /*--when newIndex is at end of the array or almost at begining of the array --*/
    if (newIndex >= 0) {       
      const newSong = currentPlaylist[newIndex];
      newSongId = newSong.song_id;

      if (!newSongId)
        handleError(`there is no newSongId chooseSong function`, true)

    } else if (newIndex < 0) {    /*--when newIndex is at begining of array --*/
      newIndex = playlistLen;
      const newSong = currentPlaylist[newIndex];
      newSongId = newSong.song_id;

      if (!newSongId)
        handleError(`there is no newSongId chooseSong function`, true)
    }

    /*---------------------FINAL EXECUTION---------------------*/
    setCurrentPlaylistI(newIndex)
    await chooseSong(newSongId)



  };

  async function chooseSong(song_id) {
    try {
      const responde = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getSong?id=${song_id}`)
      const data = await responde.json();
      const findedSong = data.data[0];
      if (findedSong) {
        await addView(song_id) /*add a one to view counter */
        chooseSongSetUI()   /*set UI */
        chooseSongSetData(findedSong)
      }
    } catch (err) {
      handleError(`'chooseSong function ${err}`, true)
      return null
    }

    function chooseSongSetUI() {
      setShow(true)
    }

    function chooseSongSetData(findedSong) {
      latestListened(findedSong)/*handle latest listened*/
      setCurrentSong(findedSong)/*set data about song */
    }

  }




  return {
    audioRef,
    currentIndex,
    isPlaying,
    duration,
    currentTime,
    volume,
    muted,
    loop,
    setCurrentTime,
    togglePlay,
    setAudioVolume,
    toggleMute,
    toggleLoop,
    goToNext,
    goToPrevious,
    setCurrentIndex,
    chooseSong
  };
}


function handleError(details, throwError = false) {
  console.error('App Error', details);

  if (throwError) {
    throw new Error(details)
  }
}

