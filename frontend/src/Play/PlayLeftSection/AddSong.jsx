import Playlist from "./Playlist"
export default function AddSong({ showAddSong, playlists }) {
    const render = () => {
        if (showAddSong) {
            return (
                <div className="show-add-song-container">
                    {playlists.map((playlist) => (
                        <Playlist playlist={playlist}/>
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