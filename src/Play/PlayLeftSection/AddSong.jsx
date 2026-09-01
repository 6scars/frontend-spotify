import Playlist from "./Playlist"
import { useAuthContext } from '../../contexts/AuthContext';
import { BACKEND_URL } from '../../config.js';

import './AddSong.css';

export default function AddSong({ currentSong, showAddSong, fetchAuthState }) {
    const { playlists } = useAuthContext()

    async function handleAddSong(song_id, playlist_id) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/addSongToPlaylist`, {
                "method": "POST",
                "headers": {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    playlist_id,
                    song_id
                })
            })
            const data = await response.json();
            console.log(data)
            fetchAuthState()
            return null
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async function handleRemoveSong(song_id, playlist_id) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/handleRemoveSong`, {
                "method": "POST",
                "headers": {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    playlist_id,
                    song_id
                })
            })
            const data = await response.json();
            console.log(data)
            fetchAuthState()
            return null
        } catch (err) {
            console.error(err)
            return null
        }
    }


    const render = () => {
        if (showAddSong) {
            return (
                <div className="show-add-song-container">
                    {playlists.map((playlist) => (
                        <Playlist key={playlist.playlist_id} handleRemoveSong={handleRemoveSong} handleAddSong={handleAddSong} currentSong={currentSong} playlist={playlist} />
                    ))}
                </div>
            )
        }
        if (!showAddSong) {
            return (
                <>
                </>
            )
        }

    }

    return (
        <>
            {render()}
        </>

    )
}
