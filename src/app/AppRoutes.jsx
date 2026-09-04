import { Route, Routes } from 'react-router-dom'

import MiniSpotify from '../App.jsx'
import DiscoverPage from '../pages/Discover/DiscoverPage.jsx'
import FavoritesPage from '../pages/Favorites/FavoritesPage.jsx'
import HomePage from '../pages/Home/HomePage.jsx'
import LibraryPage from '../pages/Library/LibraryPage.jsx'
import PlaylistPage from '../pages/Playlist/PlaylistPage.jsx'
import PlaylistsPage from '../pages/Playlists/PlaylistsPage.jsx'
import RadioPage from '../pages/Radio/RadioPage.jsx'
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx'
import AddSong from '../widgets/AddSong/AddSong.jsx'
import { APP_ROUTES } from './routes.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MiniSpotify />}>
        <Route index element={<HomePage />} />
        <Route element={<DiscoverPage />} path={APP_ROUTES.discover} />
        <Route element={<FavoritesPage />} path={APP_ROUTES.favorites} />
        <Route element={<LibraryPage />} path={APP_ROUTES.library} />
        <Route element={<PlaylistsPage />} path={APP_ROUTES.playlists} />
        <Route element={<PlaylistPage />} path={APP_ROUTES.playlist} />
        <Route element={<RadioPage />} path={APP_ROUTES.radio} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AddSong />} path={APP_ROUTES.addSong} />
    </Routes>
  )
}
