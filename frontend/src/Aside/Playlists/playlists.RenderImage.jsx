
export default function renderImage({playlist, index}){
      
            <img
              key={playlist.song_ids[index]}
              alt="playlist"
              src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures/${playlist.song_images[index]}`}
              onload={()=> setLoading(false)}
              className="h-full w-full object-cover"
            />  
}