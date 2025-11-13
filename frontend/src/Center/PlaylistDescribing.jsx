import { useState, useEffect } from 'react'
import SongInThePlaylist from "./PlaylistDescribing/SongInThePlaylist"
import './PlaylistDescribing.css'
import { useCurrentPlaybackContext } from '../contexts/CurrentPlaybackContext';
import { usePlayerContext } from '../contexts/PlayerContext';

export default function PlaylistDescribing() {
    const [playlist, setPlaylist] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const { playlist_id, setCurrentPlaylist, setCurrentPlaylistI } = useCurrentPlaybackContext();
    const { chooseSong } = usePlayerContext();

    useEffect(() => {
        setPlaylist([])
        setIsLoading(true)
        const fetchThePlaylistData = async () => {
            const response = await fetch(`http://localhost:3005/api/getPlaylistData?id=${playlist_id}`);
            const data = await response.json();
            setPlaylist(data.data)
            setIsLoading(false);
        }
        if (playlist_id !== null && playlist_id !== undefined) {
            fetchThePlaylistData();
        }

    }, [playlist_id])

    function handleStartPlaylist(song_id = null) {
        console.log(song_id)
        console.log(playlist)
        setCurrentPlaylist(playlist)
        if (song_id) {
            const findedSongI = playlist.findIndex((data) => (song_id === data.song_id))
            console.log(findedSongI)
            chooseSong(playlist[findedSongI].song_id)
            setCurrentPlaylistI(findedSongI)
        }

        if (!song_id) {
            chooseSong(playlist[0].song_id)
            setCurrentPlaylistI(0)
        }


    }

    const render = () => {
        // console.log(playlist)
        // console.log(playlist_id)
        if (isLoading) {
            return (
                <div className="text-white">
                    is loading...
                </div>
            )
        }
        if (!isLoading) {
            // console.log(playlist)
            return (
                <div className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
                    relative  flex justify-center items-center playlist-describing" >
                    <div className="playlist-describing-wrapper w-[90%] h-[95%]  ">
                        <div className="playlist-name-container flex justify-start items-center ">
                            <span className="text-[3rem] text-[var(--main-color)] font-bold h-25">{playlist[0].name}</span>
                        </div>

                        <div className="playlist-controlls flex justify-end items-center ">
                            <img onClick={() => handleStartPlaylist()} alt="play button" className="h-12 cursor-pointer" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/startSong.svg`} />
                        </div>
                        <div className="devider" />
                        <div className="playlist-songs-container flex flex-col justify-center items-center w-full">
                            {playlist.map((song) => (
                                <SongInThePlaylist key={song.song_id} song={song} handleStartPlaylist={handleStartPlaylist} />
                            )
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            {render()}
        </>

    )
}