import { useState, useEffect } from "react"

export default function SongInThePlaylist({ song, handleStartPlaylist }) {
    if (!song || !handleStartPlaylist) {
        throw new Error(` there is so 'song' or 'handleStartPlaylist' in 'SongInThePlaylist' component`)
    }

    return (
        <>

            <div className="song-description-container  ">
                <div className="img-wrapper w-[15%] h-full ">
                    <img className="h-full w-full" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.song_image}`} />
                </div>
                <div className="song-information-container w-[70%] flex flex-col">
                    <span> {song.song_name}</span>
                    <span className="text-[var(--help-color)]"> {song.author}</span>
                </div>
                <div className="song-controll-container w-[10%] h-full flex justify-center items-center">
                    <button onClick={() => { handleStartPlaylist(song.song_id) }} className="song_button w-full ">PLAY</button>
                </div>
            </div>


        </>
    )
}