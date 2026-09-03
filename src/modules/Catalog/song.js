export function getSongId(song) {
  return song?.song_id ?? song?.id ?? null
}

const artworkStorageUrl = 'https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures'

export function getArtworkUrl(song) {
  return song?.song_image ? `${artworkStorageUrl}/${encodeURIComponent(song.song_image)}` : null
}
