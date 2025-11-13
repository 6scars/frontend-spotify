import { useEffect } from 'react'

import SongInThePlaylist from "./PlaylistDescribing/SongInThePlaylist"

import './PlaylistDescribing.css'

import { useCurrentPlaybackContext } from '../contexts/CurrentPlaybackContext';
import { useUIStateContext } from '../contexts/UIStateContext';

import usePlaylists from '../hooks/usePlaylists'

export default function PlaylistDescribing() {
    const { playlist_id } = useCurrentPlaybackContext();
    const { isLoading, setIsLoading } = useUIStateContext();
    const { playlist, setPlaylist, fetchThePlaylistData, handleStartPlaylist } = usePlaylists();

    useEffect(() => {
        setPlaylist([])
        setIsLoading(true)
        const fetch = async () => {
            await fetchThePlaylistData(); /* get data about the playlist we clicked */
        }
        fetch()
    }, [playlist_id])



    const render = () => {
        if (isLoading) {
            return (
                <div className="text-white">
                    is loading...
                </div>
            )
        }
        if (!isLoading) {
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