export const APP_ROUTES = Object.freeze({
  home: '/',
  discover: '/discover',
  library: '/library',
  favorites: '/favorites',
  playlists: '/playlists',
  playlist: '/playlists/:playlistId',
  radio: '/radio',
  nowPlaying: '/now-playing',
  account: '/account',
  settings: '/settings',
  artist: '/artists/:artistName',
  addSong: '/addSong',
})

export function getPlaylistRoute(playlistId) {
  return `${APP_ROUTES.playlists}/${encodeURIComponent(String(playlistId))}`
}

export function getArtistRoute(artistName) {
  return `/artists/${encodeURIComponent(String(artistName))}`
}
