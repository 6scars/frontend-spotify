
export default function Image({ imgUrl }) {
    
    return (
        <div className="song-image-container h-[75%] ">
            <img
                className={`song__image `}
                src={`${imgUrl}`}
            ></img>
        </div>
    )
}