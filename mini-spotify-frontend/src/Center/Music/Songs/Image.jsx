import {useState} from "react"
export default function Image({ song }) {
    const [loaded, setLoaded] = useState(false)
    return (
        <div className="song-image-container h-[75%] ">
            <img
                className={`song__image ${loaded ? "loaded" : "notLoaded"}`}
                onLoad={() => setLoaded(true)}
                onError={() => console.error("Failed to load image")}
                src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${song.songImage}`}
            ></img>
        </div>
    )
}