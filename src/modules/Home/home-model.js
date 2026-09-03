export function getSongId(song) {
  return song?.song_id ?? song?.id ?? null
}

const storageUrl = 'https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/songPictures'

export function getArtworkUrl(song) {
  return song?.song_image ? `${storageUrl}/${encodeURIComponent(song.song_image)}` : null
}

export function buildHomeModel(songsValue, latestValue) {
  const songs = Array.isArray(songsValue) ? songsValue.filter(Boolean) : []
  const latest = Array.isArray(latestValue) ? latestValue.filter(Boolean) : []
  const recentIds = new Set()
  const recent = latest.filter((song) => {
    const id = getSongId(song)
    if (id === null || recentIds.has(id)) return false
    recentIds.add(id)
    return true
  }).slice(0, 6)

  if (!songs.length) {
    return {
      featured: null,
      selected: [],
      recent,
      mixes: [],
    }
  }

  const mixDetails = [
    ['Daily Mix 1', 'Ostatnio słuchane'],
    ['Daily Mix 2', 'Nowe rekomendacje'],
    ['Daily Mix 3', 'Głębokie brzmienia'],
    ['Daily Mix 4', 'Spokojniejszy wybór'],
  ]

  const mixes = mixDetails.map(([title, subtitle], mixIndex) => ({
    title,
    subtitle,
    tracks: songs.filter((_, songIndex) => songIndex % mixDetails.length === mixIndex),
  })).filter((mix) => mix.tracks.length)

  return {
    featured: songs[0],
    selected: songs.slice(0, 5),
    recent,
    mixes,
  }
}
