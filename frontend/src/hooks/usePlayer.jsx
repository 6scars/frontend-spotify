// src/hooks/usePlayer.jsx
import { useState, useRef, useEffect } from "react";
import { addView } from "../scripts/Fetches.jsx";

export function usePlayer(currentPlaylist = [], chooseSongCallback, currentSong = null) {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  // --- sync currentIndex when currentSong or playlist changes ---
  useEffect(() => {
    if (!currentSong || !currentPlaylist || currentPlaylist.length === 0) return;

    const idx = currentPlaylist.findIndex(
      s => Number(s.song_id) === Number(currentSong.song_id) || Number(s.id) === Number(currentSong.id)
    );

    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  }, [currentSong, currentPlaylist]);

  // --- attach audio listeners ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => goToNext();

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
    // note: audioRef.current is not a valid dependency, listeners are attached when audio exists and effect runs
  }, [currentPlaylist, /* keep stable: don't include chooseSongCallback to avoid reattach */]);

  // --- playback controls ---
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
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

  const playAtIndex = (index) => {
    if (!currentPlaylist || !currentPlaylist[index]) return;
    const song = currentPlaylist[index];
    addView(song.song_id);
    // inform parent to load the song (parent should set currentSong)
    chooseSongCallback(song.song_id);
    setCurrentIndex(index);
    setIsPlaying(true);

    const audio = audioRef.current;
    if (audio) {
      const onLoaded = () => {
        audio.play().catch(() => {});
        audio.removeEventListener("loadedmetadata", onLoaded);
      };
      audio.addEventListener("loadedmetadata", onLoaded);
    }
  };

  const goToNext = () => {
    if (!currentPlaylist || currentPlaylist.length === 0) return;

    // if we don't know currentIndex, try to start from 0
    const nextIndex = currentIndex == null
      ? 0
      : (currentIndex + 1) % currentPlaylist.length;

    playAtIndex(nextIndex);
  };

  const goToPrevious = () => {
    if (!currentPlaylist || currentPlaylist.length === 0) return;

    const prevIndex = currentIndex == null
      ? currentPlaylist.length - 1
      : (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;

    playAtIndex(prevIndex);
  };

  return {
    audioRef,
    currentIndex,
    isPlaying,
    duration,
    currentTime,
    volume,
    muted,
    loop,
    togglePlay,
    setAudioVolume,
    toggleMute,
    toggleLoop,
    goToNext,
    goToPrevious,
    playAtIndex,
    setCurrentIndex
  };
}
