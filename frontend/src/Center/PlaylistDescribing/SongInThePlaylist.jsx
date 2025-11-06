import { useState, useEffect } from "react"

export default function SongInThePlaylist({ song }) {
    console.log(song)
    return (
        <>
            {
                <div className="song-description-container h-15 g-blue-400 flex justify-center items-center border-[var(--main-color)] border-1 rounded-md text-[var(--main-color)]">
                    <div className="img-wrapper w-[10%]">
                        <img className="h-full w-full" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.song_Image}`} />
                    </div>
                    <div className="song-information-container w-[70%] flex flex-col">
                        <span> {song.song_Name}</span>
                        <span className="text-[var(--help-color)]"> {song.author}</span>
                    </div>
                    <div className="song-controll-container w-[10%] h-full flex justify-center items-center">
                        <button  className="song_button w-full ">PLAY</button>
                    </div>
                </div>
            }

        </>
    )
}