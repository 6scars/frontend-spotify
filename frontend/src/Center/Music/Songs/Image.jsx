import {useState}       from "react"

export default function Image({ song_image }) {
    const [loaded, setLoaded]   = useState(false)
    const [src, setSrc]         = useState(`${import.meta.env.VITE_SUPA_B_STOR}/images/songPictures/${song_image}`)
    return (
        <div className="song-image-container h-[75%] w-full rounded-xl">
            {!loaded && (
                <div className="h-full w-full shimmer"> </div>
                )}
            <img
                className={`song__image ${loaded ? "loaded" : "notLoaded"}`}
                onLoad={() => setLoaded(true)}
                onError={() => setSrc(`${import.meta.env.VITE_SUPA_B_STOR}/images/NOTFOUND.jpeg`)}
                src={src}
            ></img>
        </div>
    )
}