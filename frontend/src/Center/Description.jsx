import { useCurrentPlaybackContext }        from "../contexts/CurrentPlaybackContext";
import { useUIStateContext }                from "../contexts/UIStateContext"
import "./Description.css";
export default function Description() {
  const { currentSong }     = useCurrentPlaybackContext();
  const { setShow }         = useUIStateContext()

  return (
    <>
      <div
        className="description red-scroll-bar
      "
      >
        <div onClick={()=>setShow(false)}>close</div>
        <div className="description-img-container ">
          <img
            alt="description-img"
            src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${currentSong.song_image}`}
            className="rounded-xl h-[521px] object-cover"
          ></img>
        </div>
        <div className="author-title w-full rounded-xl">
          <span>Song Informations: </span>
          <div className="song-infromations-wrapper">
            <p className="title__paragraph font-bold">Name: {currentSong.song_name}</p>
            <p className="aritst__name__paragraph font-bold">Author: {currentSong.author}</p>
            <p className="aritst__name__paragraph font-bold text-black">Views:{currentSong.views} views</p>
          </div>

        </div>

        <div className="description-about w-full rounded-xl ">
          <div className="about-artist-image-container rounded-tl-xl rounded-tr-xl overflow-hidden">
            <img
              alt="artist-image"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/authorPictures/${currentSong.author_image}`}
              className="artist__image w-full  h-[200px] object-cover"
            />
          </div>
          <div className="about-artist-text-container">
            <div className="artist-name text-white font-bold">
              {currentSong.song_name}
            </div>
            <div className="artist-follow flex">
              <div className="followers flex-1 flex items-center">
                {currentSong.follows} right now follows
              </div>
              <div className="follow flex-1 flex justify-center">
                <button className="follow__button border-1 border-white rounded-full">
                  {" "}
                  Follow
                </button>
              </div>
            </div>
            <div className="artist-short-desc">{currentSong.biograph}</div>
          </div>

        </div>
        <div className="credit-container   ">
          <p>CREDIT</p>
          <div className="credit-text-container">
            {currentSong.credit}
          </div>
        </div>
      </div>
    </>
  );
}
