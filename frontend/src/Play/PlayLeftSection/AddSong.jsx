import Playlist from "./Playlist"
export default function AddSong({ currentSong, showAddSong, playlists }) {
    const render = () => {
        if (showAddSong) {
            return (
                <div className="show-add-song-container">
                    {playlists.map((playlist) => (
                        <Playlist key={playlist.playlist_id} currentSong={currentSong} playlist={playlist}/>
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