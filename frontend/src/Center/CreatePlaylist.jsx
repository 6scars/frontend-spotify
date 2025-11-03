import { useState } from 'react'
import './CreatePlaylist.css'
import RenderSongsToAdd from './CreatePlaylist/RenderSongsToAdd'
export default function CreatePlaylist({ SONGS }) {
    const [songsToAdd, setSongsToAdd] = useState(new Set());
    const [playlistName, setPlaylistName] = useState('')
    const handleCreateNewPlaylist = async (e) => {
        e.preventDefault();
        if (!playlistName?.length) {

            console.log('Input name of the playlist')
            return { message: 'Input name of the playlist' }

        }
        try {
            const songsToAddArray = Array.from(songsToAdd);
            const responde = await fetch('http://localhost:3005/api/createPlaylist', {
                "method": 'POST',
                "headers": {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('jwt')}`
                },
                "body": JSON.stringify({
                    playlistName,
                    songsToAddArray
                })
            })
            const data = await responde.json();
            console.log(data.message)
        } catch (err) {

        }
    }
    return (
        <>
            <div
                className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
                      relative
                    "
            >
                <div className="create-playlist">
                    <form className="create__playlist__form">
                        <div className="flex flex-row justify-center items-center gap-5 text-[1.2rem]">
                            <label className="text-[var(--main-color)]">
                                NAME:
                            </label>
                            <input onChange={(e) => setPlaylistName(e.target.value)} className="name__input bg-black text-[var(--main-color)]" name="name" placeholder="name" type='text' />
                            <button onClick={handleCreateNewPlaylist} className="text-[var(--main-color)] cursor-pointer">create</button>
                        </div>

                    </form>
                </div>
                <div className="songs-to-add flex flex-col justify-center items-center gap-5">
                    <span className="text-[var(--main-color)] text-[1.2rem]"> Proposed Songs For you</span>
                    {SONGS.map((song) => (
                        <RenderSongsToAdd key={song.song_id} song={song} songsToAdd={songsToAdd} setSongsToAdd={setSongsToAdd} />
                    ))}

                </div>

            </div>
        </>
    )
}