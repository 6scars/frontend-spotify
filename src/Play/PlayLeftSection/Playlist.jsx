import { useState, useEffect } from 'react'
export default function Playlist({ handleRemoveSong, handleAddSong, currentSong, playlist }) {
       const [isLoading, setIsloading] = useState(true);
       const [isSongIncluded, setIsSongIncluded] = useState(false);

       useEffect(() => {
              setIsSongIncluded(false)
              setIsloading(true)
              if (currentSong && playlist) {
                     const allSongIds = playlist.song_ids;
                     const findedId = allSongIds.find((id) => id === currentSong.id)
                     if (findedId) {
                            setIsSongIncluded(true)
                     }
                     setIsloading(false)
              }
              /*--currentSong rerender Playlist Component every time the song have changed, */
       }, [currentSong, playlist])

       const render = () => {
              if (!isLoading) {
                     if (isSongIncluded) {
                            return (
                                   <>

                                          <div onClick={() => handleRemoveSong(currentSong.id, playlist.playlist_id)} className={`add-song-playlist include`}>
                                                 {playlist.playlist_name}
                                                 
                                          <div className="w-5 h-5 bg-red-500"/>
                                          </div>

                                   </>
                            )
                     } else {
                            return (
                                   <div onClick={() => handleAddSong(currentSong.id, playlist.playlist_id)} className={`add-song-playlist`}> {playlist.playlist_name}</div>
                            )
                     }


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