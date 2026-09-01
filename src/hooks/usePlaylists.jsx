import { useState }                         from 'react'
import { useCurrentPlaybackContext }        from '../contexts/CurrentPlaybackContext';
import { usePlayerContext }                 from '../contexts/PlayerContext';
import { useUIStateContext }                from '../contexts/UIStateContext'
import {useToastContext}                           from '../contexts/ToastContext'
import { BACKEND_URL }                             from '../config.js'


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
            if(!playlist[0].song_id) {
                showError("there is no song in playlist")
                return null
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
