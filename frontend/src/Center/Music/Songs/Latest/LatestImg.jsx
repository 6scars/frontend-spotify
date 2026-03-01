import { useState } from "react"


export default function LatestImg({img}){
    const [src, setSrc] = useState(`${import.meta.env.VITE_SUPA_B_STOR}/images/songPictures/${img}`)

    return(
        <img
            className="playlist__image"
            src={src}
            onError={()=>{setSrc(`${import.meta.env.VITE_SUPA_B_STOR}/images/NOTFOUND.jpeg`);}}
        ></img>
    )
}