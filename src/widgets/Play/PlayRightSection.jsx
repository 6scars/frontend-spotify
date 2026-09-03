import "./PlayRightSection.css";

export default function PlayRightSection({ volume, handleVolume, muted,  handleMute }) {

  function changeVolume(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const prc = (e.clientX - rect.left) / rect.width;
    handleVolume(prc);
  }

  return (
    <div
      className="play-right-section "
    >
      <div className="volume-container">
        <div className="volume-icon-container">
          <img
            className="cursor-pointer"
            onClick={handleMute}
            alt="speaker-volume"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/speaker${muted ? 'Crossed' : ''}Song.svg`}
          />
        </div>
        <div
          onClick={(event) => {
            changeVolume(event);
          }}
          className="volume min-w-[35px] w-full bg-[var(--help-color2)] h-[10px] rounded-md overflow-hidden"
        >
          <div
            style={{ width: `${volume * 100}%` }}
            className="h-full bg-white"
          ></div>
          
        </div>
        <div className="volume__text text-red-500">{volume.toFixed(2)}</div>
      </div>
    </div>
  );
}
