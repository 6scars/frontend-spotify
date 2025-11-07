import { useState } from 'react'
import Playlist from "./Playlist"

export default function AddSong({ currentSong, showAddSong, playlists, fetches }) {

    async function handleAddSong(song_id, playlist_id) {
        try {
            const response = await fetch('http://localhost:3005/api/addSongToPlaylist', {
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
            fetches()
            return null
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async function handleRemoveSong(song_id, playlist_id) {
        try {
            const response = await fetch('http://localhost:3005/api/handleRemoveSong', {
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
            fetches()
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