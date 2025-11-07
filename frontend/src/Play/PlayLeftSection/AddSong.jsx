import Playlist from "./Playlist"
export default function AddSong({ currentSong, showAddSong, playlists }) {
    async function handleAddSong(song_id, playlist_id ) {
        try {
            const response = await fetch('http://localhost:3005/api/addSongToPlaylist', {
                "method": "POST",
                "headers": {
                    'Content-type': 'application/json',
                    'authorization':`Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    playlist_id,
                    song_id
                })
            })
            const data = await response.json();
            console.log(data)
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
                        <Playlist key={playlist.playlist_id} handleAddSong={handleAddSong} currentSong={currentSong} playlist={playlist} />
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