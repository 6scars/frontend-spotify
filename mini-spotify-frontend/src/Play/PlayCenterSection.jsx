export default function ProgressBar({
  audioRef,
  handlePlay,
  play,
  duration,
  current,
  setCurrent,
  progressBar,
  loop,
  handleLoop,
  currentSong
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

    setCurrent(newTime);
    audioRef.current.currentTime = newTime;
  }

  return (
    <div
      className="play-center-section h-full w-[400px] min-w-[200px] max-w-[600px]
        flex flex-col items-center
      "
    >
      <div className="w-full flex-1 flex justify-center items-center gap-5">
        <button>
          <img
            onClick={handleLoop}
            className="h-[35px]  cursor-pointer"
            alt="loop-song"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${
              loop ? "" : "Crossed"
            }Song.svg`}
          />
        </button>
        <button>
          <img
            alt="start-music"
            src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/previousSong.svg"
            className="w-10 h-full cursor-pointer"
          />
        </button>
        <button onClick={handlePlay}>
          <img
            alt="start-music"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/${
              play ? "pause" : "start"
            }Song.svg`}
            className="w-10 h-full cursor-pointer"
          />
        </button>
        <button>
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
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${
              loop ? "" : "Crossed"
            }Song.svg`}
          />
        </button>
      </div>

      <div className="w-full flex-1 flex justify-center items-center">
        <div className="text-red-500 min-w-[50px]">{formatTime(current)}</div>
        <div
          onClick={(event) => onSeek(event)}
          className="w-[300px] h-[15px] bg-[var(--help-color2)] rounded-full overflow-hidden"
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
        <div className="text-red-500  min-w-[50px]">{formatTime(duration)}</div>
      </div>
    </div>
  );
}
