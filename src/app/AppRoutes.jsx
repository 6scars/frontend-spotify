import { Route, Routes } from 'react-router-dom'

import MiniSpotify from '../App.jsx'
import HomePage from '../pages/Home/HomePage.jsx'
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx'
import AddSong from '../widgets/AddSong/AddSong.jsx'
import { APP_ROUTES } from './routes.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MiniSpotify />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AddSong />} path={APP_ROUTES.addSong} />
    </Routes>
  )
}
