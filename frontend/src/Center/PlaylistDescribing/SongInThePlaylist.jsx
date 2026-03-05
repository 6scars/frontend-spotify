import { useEffect, useState }         from 'react'
import                           './SongInThePlaylist.css'

export default function SongInThePlaylist({ song, handleStartPlaylist }) {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        if(song) setLoading(false)
    },[])


    if (!song || !handleStartPlaylist) {
        throw new Error(` there is so 'song' or 'handleStartPlaylist' in 'SongInThePlaylist' component`)
    }

    return (
        <>

            <div className="song-description-container ">
                <div className="img-wrapper min-w-[15%] h-full overflow-hidden">
                    {loading && (<div className="w-full h-full shimmer"> </div>)}
                    <img className="h-full w-full" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.song_image}`} />
                </div>
                <div className="song-information-wrapper w-[70%] h-full flex items-center">
                    <div className="song-information-container w-full h-full">
                        {loading && (<div className="w-full h-full shimmer"> </div>)}
                        {!loading && (<div className="w-full h-full">
                            <span className="block"> {song.song_name}</span>
                            
                            <span className="text-[var(--help-color)]  block">{song.author}</span>
                        </div>
                        )}
                        
                    </div>

                </div>

                <div className="song-controll-container w-[10%] h-full flex justify-center items-center">
                    <button onClick={() => { handleStartPlaylist(song.song_id) }} className="song_button w-full ">PLAY</button>
                </div>
            </div>


        </>
    )
}