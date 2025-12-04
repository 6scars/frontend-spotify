import { useState } from 'react'

import { useCurrentPlaybackContext } from '../contexts/CurrentPlaybackContext';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useUIStateContext } from '../contexts/UIStateContext'


function usePlaylists() {
    const [playlist, setPlaylist] = useState([])

    const { playlist_id, setCurrentPlaylist, setCurrentPlaylistI } = useCurrentPlaybackContext();
    const { chooseSong } = usePlayerContext();
    const { isLoading, setIsLoading } = useUIStateContext();


    const fetchThePlaylistData = async () => {
        console.log('fetch')
        if (playlist_id !== null && playlist_id !== undefined) {
            const response = await fetch(`https://spotify-backend-1-olcd.onrender.com/api/getPlaylistData?id=${playlist_id}`);
            const data = await response.json();
            setPlaylist(data.data)
            setIsLoading(false);
        }
    }



    async function handleStartPlaylist(song_id = null) {
        setCurrentPlaylist(playlist)
        if (song_id) {
            const findedSongI = playlist.findIndex((data) => (song_id === data.song_id))
            const songId = playlist[findedSongI].song_id
            await chooseSong(songId)
            setCurrentPlaylistI(findedSongI)
        }

        if (!song_id) {
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