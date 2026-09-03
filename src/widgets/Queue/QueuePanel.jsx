import { useAuthContext } from '../../modules/Auth/useAuthContext.js'
import { useCurrentPlaybackContext } from '../../modules/CurrentPlayback/useCurrentPlaybackContext.js'
import { usePlayerContext } from '../../modules/Player/usePlayerContext.js'
import Icon from '../../shared/ui/Icon.jsx'
import { getArtworkUrl, getSongId } from '../../modules/Home/home-model.js'
import './QueuePanel.css'

export default function QueuePanel() {
  const { songs } = useAuthContext()
  const { currentSong, currentPlaylist, setCurrentPlaylist, setCurrentPlaylistI } = useCurrentPlaybackContext()
  const { chooseSong } = usePlayerContext()
  const queue = currentPlaylist.length ? currentPlaylist : (songs || []).slice(0, 7)
  const nowPlaying = currentSong || queue[0]

  const playFromQueue = (song, index) => {
    const id = getSongId(song)
    if (id === null) return
    setCurrentPlaylist(queue)
    setCurrentPlaylistI(index)
    chooseSong(id)
  }

  const clearQueue = () => {
    setCurrentPlaylist([])
    setCurrentPlaylistI(null)
  }

  return (
    <aside className="queue-panel" aria-label="Kolejka odtwarzania">
      <div className="queue-panel__title">
        <h2>Teraz gra</h2>
        <span className="queue-panel__meter" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="queue-panel__current">
        <span className="queue-panel__eyebrow">Teraz odtwarzane</span>
        {nowPlaying ? (
          <div className="queue-song queue-song--current">
            <div className="queue-song__cover">{getArtworkUrl(nowPlaying) ? <img alt="" src={getArtworkUrl(nowPlaying)} /> : null}</div>
            <span><strong>{nowPlaying.song_name}</strong><small>{nowPlaying.author}</small></span>
            <span className="queue-equalizer" aria-label="Odtwarzanie"><i /><i /><i /></span>
          </div>
        ) : <p className="queue-panel__empty">Wybierz utwór, aby rozpocząć.</p>}
      </div>
      <div className="queue-panel__bar">
        <h3>Kolejka</h3>
        <button onClick={clearQueue} type="button">Wyczyść</button>
      </div>
      <div className="queue-panel__list">
        {queue.map((song, index) => (
          <button className="queue-song" key={`${getSongId(song)}-${index}`} onClick={() => playFromQueue(song, index)} type="button">
            <span className="queue-song__cover">{getArtworkUrl(song) ? <img alt="" src={getArtworkUrl(song)} /> : null}</span>
            <span><strong>{song.song_name}</strong><small>{song.author}</small></span>
            <Icon name="more" size={17} />
          </button>
        ))}
      </div>
      <p className="queue-panel__duration">{queue.length ? `${queue.length} utworów w kolejce` : 'Kolejka jest pusta'}</p>
    </aside>
  )
}
