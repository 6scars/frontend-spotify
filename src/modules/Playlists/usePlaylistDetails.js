import { useEffect, useMemo, useState } from 'react'

import { BACKEND_URL } from '../../config.js'
import { getSongId } from '../Catalog/song.js'
import { useCurrentPlaybackContext } from '../CurrentPlayback/useCurrentPlaybackContext.js'
import { usePlayerContext } from '../Player/usePlayerContext.js'
import { buildPlaylistPageModel } from './playlist-page-model.js'

export function usePlaylistDetails(playlistId) {
  const [playlistData, setPlaylistData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { currentSong, setCurrentPlaylist, setCurrentPlaylistI } = useCurrentPlaybackContext()
  const { chooseSong } = usePlayerContext()
  const model = useMemo(() => buildPlaylistPageModel(playlistData), [playlistData])

  useEffect(() => {
    const controller = new AbortController()

    async function loadPlaylist() {
      setIsLoading(true)
      setError(null)
      setPlaylistData([])
      try {
        const response = await fetch(`${BACKEND_URL}/api/getPlaylistData?id=${encodeURIComponent(playlistId)}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`Nie udało się pobrać playlisty (${response.status})`)
        const payload = await response.json()
        if (!controller.signal.aborted) setPlaylistData(Array.isArray(payload?.data) ? payload.data : [])
      } catch (requestError) {
        if (!controller.signal.aborted) setError(requestError.message || 'Nie udało się pobrać playlisty')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadPlaylist()
    return () => controller.abort()
  }, [playlistId])

  const playTrack = async (songId) => {
    const index = model.tracks.findIndex((track) => String(getSongId(track)) === String(songId))
    if (index < 0) return
    setCurrentPlaylist(model.tracks)
    setCurrentPlaylistI(index)
    await chooseSong(getSongId(model.tracks[index]))
  }

  return {
    currentSong,
    error,
    isLoading,
    model,
    playAll: () => model.tracks[0] && playTrack(getSongId(model.tracks[0])),
    playTrack,
  }
}
