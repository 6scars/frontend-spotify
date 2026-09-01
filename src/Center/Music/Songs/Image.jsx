import {useState}       from "react"
import { SUPABASE_STORAGE_URL } from "../../../config.js"

export default function Image({ song_image }) {
    const [loaded, setLoaded]   = useState(false)
    const [src, setSrc]         = useState(`${SUPABASE_STORAGE_URL}/images/songPictures/${song_image}`)
    return (
        <div className="song-image-container h-[75%] w-full rounded-xl">
            {!loaded && (
                <div className="h-full w-full shimmer"> </div>
                )}
            <img
                className={`song__image ${loaded ? "loaded" : "notLoaded"}`}
                onLoad={() => setLoaded(true)}
                onError={() => setSrc(`${SUPABASE_STORAGE_URL}/images/NOTFOUND.jpeg`)}
                src={src}
            ></img>
        </div>
    )
}
