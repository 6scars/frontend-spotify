export default function Playlist({playlist}){
    
    
       return(
        <div key={playlist.playlist_id} className="add-song-playlist"> {playlist.playlist_name}</div>
       ) 
}