import { useState } from 'react'
import { Link } from 'react-router-dom'

import { getArtistRoute } from '../../app/routes.js'
import { getArtworkUrl } from '../../modules/Catalog/song.js'
import { useUIStateContext } from '../../modules/UIState/useUIStateContext.js'
import Icon from '../../shared/ui/Icon.jsx'
import AddSong from './PlayLeftSection/AddSong.jsx'
import './PlayLeftSection.css'

export default function PlayLeftSection({ currentSong, fetchAuthState }) {
  const [showAddSong, setShowAddSong] = useState(false)
  const { show, setShow } = useUIStateContext()
  const artwork = getArtworkUrl(currentSong)

  const openDetails = () => {
    setShowAddSong(false)
    setShow(true)
  }

  return (
    <div className="play-left-section">
      <button
        aria-controls="song-description"
        aria-expanded={show}
        aria-label={`O utworze: ${currentSong.song_name}`}
        className="song-image-container"
        onClick={openDetails}
        type="button"
      >
        {artwork ? <img alt="" src={artwork} /> : <Icon name="play" size={24} />}
      </button>
      <div className="title-authors">
        <button aria-controls="song-description" aria-expanded={show} className="title" onClick={openDetails} type="button">
          {currentSong.song_name}
        </button>
        <Link className="authors" onClick={() => setShow(false)} to={getArtistRoute(currentSong.author)}>
          {currentSong.author}
        </Link>
      </div>
      <div className="play-left-section__playlist">
        <button aria-expanded={showAddSong} aria-label="Dodaj utwór do playlisty" className="play-left-section__add icon-button" onClick={() => setShowAddSong(!showAddSong)} type="button">
          <Icon name="plus" size={17} />
        </button>
        <AddSong fetchAuthState={fetchAuthState} currentSong={currentSong} showAddSong={showAddSong} />
      </div>
    </div>
  )
}
