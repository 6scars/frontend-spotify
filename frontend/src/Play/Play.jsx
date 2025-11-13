import PlayCenterSection from "./PlayCenterSection.jsx";
import PlayRightSection from "./PlayRightSection.jsx";
import PlayLeftSection from "./PlayLeftSection.jsx";
import "./Play.css";
import { usePlayerContext } from "../contexts/PlayerContext.jsx";
import { useCurrentPlaybackContext } from "../contexts/CurrentPlaybackContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Play() {
  const {
    audioRef,
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
    goToPrevious
  } = usePlayerContext();

  const { currentSong, playlists, currentPlaylist } = useCurrentPlaybackContext();
  const { fetchAuthState } = useAuthContext();


  const progressBar = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="play fixed bottom-0 left-0 right-0 bg-black h-[120px]
      flex justify-between"
    >
      <PlayLeftSection
        currentSong={currentSong}
        playlists={playlists}
        fetchAuthState={fetchAuthState}
      />

      <PlayCenterSection
        setCurrentTime={setCurrentTime}
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
