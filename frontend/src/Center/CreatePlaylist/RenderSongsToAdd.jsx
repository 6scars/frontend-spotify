import { useState } from 'react'

export default function RenderSongsToAdd({ song, setSongsToAdd }) {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddSong = (song_id) => {
        if (isAdded) {
            setIsAdded(false);
            setSongsToAdd((prev)=>{
                const updated = new Set(prev)
                updated.delete(song_id)
                return updated
            })
        } else {
            setSongsToAdd((prev) => {
                const updated = new Set(prev)
                updated.add(song_id);
                return updated
            })
            setIsAdded(true)
        }


    }
    return (
        <div className="song-to-add-container">
            <div className="img-container relative h-full w-[35%] overflow-hidden">
                <img className="img_song w-full h-full object-cover object-center " src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.song_image}`} />
            </div>
            <div className="song-desc text-[var(--main-color)] w-[55%]">
                <span>{song.song_name}</span><br></br>
                <span className="text-[var(--help-color3)] text-[0.7rem]">{song.author}</span>

            </div>
            <div onClick={() => handleAddSong(song.song_id)} className={`${isAdded ? "added-song" : "not-added-song"} flex justify-center items-center cursor-pointer w-[10%] h-full text-[var(--main-color)]`}>
                {isAdded ? '\u2611' : '+'}
            </div>
        </div>
    )
}