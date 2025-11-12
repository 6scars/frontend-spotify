import PlayCenterSection from "./PlayCenterSection.jsx";
import PlayRightSection from "./PlayRightSection.jsx";
import PlayLeftSection from "./PlayLeftSection.jsx";
import "./Play.css";
import { usePlayer } from "../hooks/usePlayer.jsx";

export default function Play({
  chooseSong,
  currentSong,
  playlists,
  fetches
}) {
  // --- Player Hook ---
  // in Play.jsx
  const {
    audioRef,
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
    goToPrevious
  } = usePlayer(currentPlaylist, chooseSong, currentSong);


  const progressBar = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="play fixed bottom-0 left-0 right-0 bg-black h-[120px]
      flex justify-between"
    >
      <PlayLeftSection
        currentSong={currentSong}
        playlists={playlists}
        fetches={fetches}
      />

      <PlayCenterSection
        audioRef={audioRef}
        handlePlay={togglePlay}
        play={isPlaying}
        duration={duration}
        current={currentTime}
        progressBar={progressBar}
        loop={loop}
        handleLoop={toggleLoop}
        currentSong={currentSong}
        currentPlaylist={currentPlaylist}
        goToNextSong={goToNext}
        goToPreviousSong={goToPrevious}
      />

      <PlayRightSection
        volume={volume}
        handleVolume={setAudioVolume}
        muted={muted}
        handleMute={toggleMute}
      />
    </div>
  );
}
