import { useState }                         from 'react'
import { useCurrentPlaybackContext }        from '../CurrentPlayback/useCurrentPlaybackContext.js';
import { usePlayerContext }                 from '../Player/usePlayerContext.js';
import { useUIStateContext }                from '../UIState/useUIStateContext.js'
import {useToastContext}                           from '../Toast/useToastContext.js'
import { BACKEND_URL }                             from '../../config.js'


function usePlaylists() {
    const [playlist, setPlaylist] = useState([])

    const { playlist_id, setCurrentPlaylist, setCurrentPlaylistI }  = useCurrentPlaybackContext();
    const { chooseSong }                                            = usePlayerContext();
    const { isLoading, setIsLoading }                               = useUIStateContext();
    const {showError}                                               = useToastContext();

    const fetchThePlaylistData = async () => {
        if (playlist_id !== null && playlist_id !== undefined) {
            const response      = await fetch(`${BACKEND_URL}/api/getPlaylistData?id=${playlist_id}`);
            const data          = await response.json();
            setPlaylist(data.data)
            setIsLoading(false);
        }
    }



    async function handleStartPlaylist(song_id = null) {
        setCurrentPlaylist(playlist)
        if (song_id) {
            const findedSongI       = playlist.findIndex((data) => (song_id === data.song_id))
            const songId            = playlist[findedSongI].song_id
            await chooseSong(songId)
            setCurrentPlaylistI(findedSongI)
        }

        if (!song_id) {
            if (!Array.isArray(playlist) || playlist.length === 0) {
                showError("Playlist is empty")
                return
            }

            const songId = playlist[0].song_id
            await chooseSong(songId)
            setCurrentPlaylistI(0)
        }


    }


    return ({
        playlist, setPlaylist,
        isLoading, setIsLoading,

        fetchThePlaylistData,
        handleStartPlaylist

    })
}

export default usePlaylists
