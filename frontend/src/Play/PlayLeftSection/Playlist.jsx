import { useState, useEffect } from 'react'
export default function Playlist({ currentSong, playlist, handleAddSong }) {
       const [isLoading, setIsloading] = useState(true);
       const [isSongIncluded, setIsSongIncluded] = useState(false);

       useEffect(() => {
              setIsSongIncluded(false)
              setIsloading(true)
              if (currentSong && playlist) {
                     console.log(playlist)
                     console.log(currentSong)
                     const allSongIds = playlist.song_ids;
                     const findedId = allSongIds.find((id) => id === currentSong.id)
                     console.log('findedId:',findedId)
                     if (findedId) {
                            setIsSongIncluded(true)
                     }
                     setIsloading(false)
              }

       }, [currentSong])

       const render = () => {
              if (!isLoading) {
                     return (
                            <div onClick={()=>handleAddSong(currentSong.id, playlist.playlist_id )} className={`add-song-playlist ${isSongIncluded ? 'include' : ''}`}> {playlist.playlist_name}</div>
                     )

              } else {
                     return (
                            <div>is loading ...</div>
                     )
              }
       }
       return (
              <>
                     {render()}
              </>

       )
}