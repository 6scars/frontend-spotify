const normalize = (value) => String(value ?? '').trim().toLocaleLowerCase('pl')

export function getPlaylistSongCount(playlist) {
  const songIds = Array.isArray(playlist?.song_ids) ? playlist.song_ids : []
  return songIds.filter((songId) => songId !== null && songId !== undefined && songId !== 'NULL').length
}

export function buildLibraryModel(playlistsValue, options = {}) {
  const playlists = Array.isArray(playlistsValue)
    ? playlistsValue.filter((playlist) => playlist?.playlist_id !== null && playlist?.playlist_id !== undefined && playlist?.playlist_name)
    : []
  const query = normalize(options.query)
  const items = playlists.filter((playlist) => normalize(playlist.playlist_name).includes(query))

  if (options.sort === 'name') {
    items.sort((left, right) => left.playlist_name.localeCompare(right.playlist_name, 'pl'))
  }

  return { items, total: playlists.length }
}
