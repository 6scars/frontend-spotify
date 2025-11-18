
import './PlayCenterSection.css'

export default function ProgressBar({
  audioRef,
  handlePlay,
  play,
  duration,
  current,
  progressBar,
  loop,
  handleLoop,
  currentSong,
  goToNextSong,
  goToPreviousSong,
  setCurrentTime

}) {
  function formatTime(time) {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function onSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const prc = clickX / rect.width;
    const newTime = prc * duration;

    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  }



  return (
    <div
      className="play-center-section  "
    >
      <div className="controll-buttons-container">
        <button>
          <img
            onClick={handleLoop}
            className="h-[35px]  cursor-pointer"
            alt="loop-song"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${loop ? "" : "Crossed"
              }Song.svg`}
          />
        </button>
        <button onClick={goToPreviousSong}>
          <img
            alt="start-music"
            src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/previousSong.svg"
            className="w-10 h-full cursor-pointer"
          />
        </button>
        <button onClick={handlePlay}>
          <img
            alt="start-music"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/${play ? "pause" : "start"
              }Song.svg`}
            className="w-10 h-full cursor-pointer"
          />
        </button>
        <button onClick={goToNextSong}>
          <img
            alt="start-music"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/nextSong.svg`}
            className="w-10 h-full cursor-pointer"
          />
        </button>
        <button>
          <img
            onClick={handleLoop}
            className="h-[35px]  cursor-pointer"
            alt="loop-song"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${loop ? "" : "Crossed"
              }Song.svg`}
          />
        </button>
      </div>

      <div className="w-full flex-1 flex justify-center items-center">
        <div className="format-current-time ">{formatTime(current)}</div>
        <div
          onClick={(event) => onSeek(event)}
          className="loading-bar-gray"
        >
          <div
            style={{ width: `${progressBar}%` }}
            className="h-full bg-white transition-all duration-300"
          />
        </div>
        <audio
          ref={audioRef}
          src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/songs/${currentSong.file}`}
          preload="metadata"
        />
        <div className="format-current-time ">{formatTime(duration)}</div>
      </div>
    </div>
  );
}
