import './CreatePlaylist.css'
export default function CreatePlaylist({ SONGS }) {
    console.log(SONGS)
    return (
        <>
            <div
                className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
                      relative
                    "
            >
                <div className="create-playlist">
                    <form className="create__playlist__form">
                        <div className="flex  justify-center items-center gap-5 text-[1.8rem]">
                            <label className="text-white">
                                NAME
                            </label>
                            <input className="name__input bg-black text-white" name="name" placeholder="name" type='text' />
                        </div>
                    </form>
                </div>
                <div className="songs-to-addition flex flex-col justify-center items-center gap-5">
                    {SONGS.map((song) => (
                        <div key={song.song_id} className="bg-black/80 rounded-xl w-100 h-30 flex items-center">
                            <div className="img-container relative h-full w-[35%] overflow-hidden">
                                <img className="object-contain" src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.song_image}`} />
                            </div>
                            <div className="text-white">
                                {song.song_name}
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </>
    )
}