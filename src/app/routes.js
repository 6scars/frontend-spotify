export const APP_ROUTES = Object.freeze({
  home: '/',
  discover: '/discover',
  library: '/library',
  favorites: '/favorites',
  playlists: '/playlists',
  playlist: '/playlists/:playlistId',
  radio: '/radio',
  addSong: '/addSong',
})

export function getPlaylistRoute(playlistId) {
  return `${APP_ROUTES.playlists}/${encodeURIComponent(String(playlistId))}`
}
