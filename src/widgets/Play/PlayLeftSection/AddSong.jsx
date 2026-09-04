import { useState } from 'react'

import { BACKEND_URL } from '../../../config.js'
import { useAuthContext } from '../../../modules/Auth/useAuthContext.js'
import { getSongId } from '../../../modules/Catalog/song.js'
import { getValidPlaylists } from '../../../modules/Playlists/playlist-collection.js'
import Icon from '../../../shared/ui/Icon.jsx'
import Playlist from './Playlist.jsx'
import './AddSong.css'

export default function AddSong({ currentSong, fetchAuthState, showAddSong }) {
  const { playlists } = useAuthContext()
  const [error, setError] = useState(null)
  const [pendingPlaylistId, setPendingPlaylistId] = useState(null)
  const validPlaylists = getValidPlaylists(playlists)

  if (!showAddSong) return null

  const togglePlaylist = async (playlist, isIncluded) => {
    const endpoint = isIncluded ? 'handleRemoveSong' : 'addSongToPlaylist'
    setError(null)
    setPendingPlaylistId(playlist.playlist_id)

    try {
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          playlist_id: playlist.playlist_id,
          song_id: getSongId(currentSong),
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Nie udało się zmienić playlisty')
      await fetchAuthState()
    } catch (requestError) {
      setError(requestError.message || 'Nie udało się połączyć z serwerem')
    } finally {
      setPendingPlaylistId(null)
    }
  }

  return (
    <section aria-label="Dodaj utwór do playlisty" className="show-add-song-container">
      <header><span className="show-add-song-container__icon"><Icon name="plus" size={16} /></span><div><strong>Dodaj do playlisty</strong><small>{currentSong.song_name}</small></div></header>
      <div className="show-add-song-container__list red-scroll-bar">
        {validPlaylists.length ? validPlaylists.map((playlist) => (
          <Playlist
            currentSong={currentSong}
            isPending={pendingPlaylistId === playlist.playlist_id}
            key={playlist.playlist_id}
            onToggle={togglePlaylist}
            playlist={playlist}
          />
        )) : <p className="show-add-song-container__empty">Nie masz jeszcze żadnej playlisty.</p>}
      </div>
      {error ? <p className="show-add-song-container__error" role="alert">{error}</p> : null}
    </section>
  )
}
