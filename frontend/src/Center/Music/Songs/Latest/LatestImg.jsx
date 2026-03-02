import { useState } from "react"


export default function LatestImg({img}){
    const [loaded, setLoaded]       = useState(false)
    const [src, setSrc]             = useState(`${import.meta.env.VITE_SUPA_B_STOR}/images/songPictures/${img}`)

    function render(){
        return(
            <div className="w-full h-full">
                {!loaded && (
                        <div className="h-full w-full shimmer"></div>
                    )}
                <img
                    className="playlist__image"
                    onLoad={()=>setLoaded(true)}
                    onError={()=>{setSrc(`${import.meta.env.VITE_SUPA_B_STOR}/images/NOTFOUND.jpeg`);}}
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