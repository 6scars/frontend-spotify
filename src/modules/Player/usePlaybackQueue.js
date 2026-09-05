import { useAuthContext } from '../Auth/useAuthContext.js'
import { useCurrentPlaybackContext } from '../CurrentPlayback/useCurrentPlaybackContext.js'
import { usePlayerContext } from './usePlayerContext.js'
import { getSongId } from '../Catalog/song.js'
import { buildPlaybackQueue } from './playback-queue.js'

export function usePlaybackQueue() {
  const { songs } = useAuthContext()
  const { currentSong, currentPlaylist, setCurrentPlaylist, setCurrentPlaylistI } = useCurrentPlaybackContext()
  const { chooseSong, isPlaying } = usePlayerContext()
  const { queue, suggestions } = buildPlaybackQueue(currentPlaylist, songs)

  const playFromQueue = (index, fromSuggestions = false) => {
    const tracks = fromSuggestions ? suggestions : queue
    const id = getSongId(tracks[index])
    if (id === null) return
    setCurrentPlaylist(tracks)
    setCurrentPlaylistI(index)
    chooseSong(id)
  }

  const clearQueue = () => {
    setCurrentPlaylist([])
    setCurrentPlaylistI(null)
  }

  return { queue, suggestions, currentSong, isPlaying, playFromQueue, clearQueue }
}
