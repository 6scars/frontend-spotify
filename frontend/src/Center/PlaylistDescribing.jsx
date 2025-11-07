import { useState, useEffect } from 'react'
import SongInThePlaylist from "./PlaylistDescribing/SongInThePlaylist"
import './PlaylistDescribing.css'
export default function PlaylistDescribing({ playlist_id, chooseSong }) {
    const [playlist, setPlaylist] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPlaylist([])
        setIsLoading(true) 
        const fetchThePlaylistData = async () => {
            const response = await fetch(`http://localhost:3005/api/getPlaylistData?id=${playlist_id}`);
            const data = await response.json();
            setPlaylist(data.data)
            setIsLoading(false);
            console.log(data)
        }
        if (playlist_id) fetchThePlaylistData();

    }, [playlist_id])


    const render = () => {
        if (isLoading) {
            return (
                <div>
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

                        <div className="playlist-controlls flex justify-start items-center ">
                            <span className="text-[var(--main-color)] "> play as playlist </span>
                            <img alt="play button" className="h-12" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/startSong.svg`} />
                        </div>
                        <div className="devider" />
                        <div className="playlist-songs-container flex flex-col justify-center items-center w-full">
                            {playlist.map((song) => (
                                <SongInThePlaylist key={song.id} song={song}  chooseSong={chooseSong}/>
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