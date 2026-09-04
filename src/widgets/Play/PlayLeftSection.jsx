import { useState, useEffect } from 'react';
import AddSong from './PlayLeftSection/AddSong';
import Icon from '../../shared/ui/Icon.jsx'
import './PlayLeftSection.css'


export default function PlayLeftSection({ currentSong,  fetchAuthState }) {
  const [isLoading, setIsloading] = useState(false)
  const [showAddSong, setShowAddSong] = useState(false)

  useEffect(() => {
    if (!currentSong) setIsloading(true);
    if (currentSong) setIsloading(false);
  }, [currentSong.id])

  function handleShowAddSong() {
    if (showAddSong) setShowAddSong(false)
    if (!showAddSong) setShowAddSong(true)
  }

  const render = () => {
    if (isLoading) {
      <div className="text-white text-20">
        is loading ...
      </div>
    }
    if (!isLoading) {
      return (
        <div className="play-left-section h-full w-[300px] flex">
          <div
            className="song-image-container "
          >
            <img
              alt="song-image"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${currentSong.song_image}`}
              className=" h-full w-full object-cover rounded-md"
            />
          </div>

          <div
            className="title-authors border-1 flex-1 
          flex flex-col
        "
          >
            <a className="title text-white cursor-pointer hover:underline">
              {currentSong.song_name}
            </a>
            <a className="authors text-[var(--help-color)] cursor-pointer hover:underline ">
              {currentSong.author}
            </a>
          </div>
          <div className="relative flex items-center">
            <button aria-expanded={showAddSong} aria-label="Dodaj utwór do playlisty" className="play-left-section__add icon-button" onClick={handleShowAddSong} type="button"><Icon name="plus" size={17} /></button>
            
              <AddSong  fetchAuthState={fetchAuthState} currentSong={currentSong} showAddSong={showAddSong}/>
            
          </div>
        </div>
      )

    }
  }

  return (
    <>
      {render()}
    </>
  )
}
