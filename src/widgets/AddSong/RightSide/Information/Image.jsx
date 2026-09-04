
export default function Image({ imgUrl }) {
  return (
    <div className="song-image-container w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
      <img
        src={imgUrl}
        alt="Uploaded song cover"
        className="w-full h-full object-contain object-center" 
      />
    </div>
  )
}
