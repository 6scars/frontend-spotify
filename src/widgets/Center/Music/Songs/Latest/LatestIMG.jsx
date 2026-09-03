import { useState } from "react"
import { SUPABASE_STORAGE_URL } from "../../../../../config.js"


export default function LatestImg({img}){
    const [loaded, setLoaded]       = useState(false)
    const [src, setSrc]             = useState(`${SUPABASE_STORAGE_URL}/images/songPictures/${img}`)

    function render(){
        return(
            <div className="w-full h-full">
                {!loaded && (
                        <div className="h-full w-full shimmer"></div>
                    )}
                <img
                    className="playlist__image"
                    onLoad={()=>setLoaded(true)}
                    onError={()=>{setSrc(`${SUPABASE_STORAGE_URL}/images/NOTFOUND.jpeg`);}}
                    src={src}
                />
            </div>
        )
    }

    return(
    <>
        {render()}
    </>
    )
}
