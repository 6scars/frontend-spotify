import { useCurrentPlaybackContext } from "../../modules/CurrentPlayback/useCurrentPlaybackContext.js";
import { useAuthContext } from "../../modules/Auth/useAuthContext.js";
import { useUIStateContext } from "../../modules/UIState/useUIStateContext.js";
import Icon from '../../shared/ui/Icon.jsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { APP_ROUTES, getPlaylistRoute } from '../../app/routes.js'
import "./Aside.css";
import Playlists from './PlayLists'

const navigation = [
  { icon: 'home', label: 'Dla Ciebie', to: APP_ROUTES.home },
  { icon: 'discover', label: 'Odkrywaj', to: APP_ROUTES.discover },
  { icon: 'library', label: 'Biblioteka', to: APP_ROUTES.library },
  { icon: 'heart', label: 'Ulubione', to: APP_ROUTES.favorites },
  { icon: 'playlists', label: 'Playlisty', to: APP_ROUTES.playlists },
  { icon: 'radio', label: 'Radio', to: APP_ROUTES.radio },
]

export default function Aside() {
  const navigate = useNavigate()
  const { showCreatePlaylistWindow, setShowCreatePlaylistWindow, setShowPlaylistDescribing, setSigning } = useUIStateContext();
  const { setPlaylists_id } = useCurrentPlaybackContext();
  const { playlists, isLogedIn } = useAuthContext();

  const displayCreatingPlaylistWindow = () => {
    if (showCreatePlaylistWindow) {
      setShowCreatePlaylistWindow(false)
      setShowPlaylistDescribing(false)
    } else {
      if (isLogedIn)
        setShowCreatePlaylistWindow(true)

      if (!isLogedIn)
        setSigning(true)
    }
  }

  const choosePlaylist = (playlist_id) => {
    setPlaylists_id(playlist_id);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false);
    navigate(getPlaylistRoute(playlist_id))
  };

  const showHome = () => {
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)
  }

  return (
    <aside className="leftBar">
      <button aria-label="Strona główna" className="brand-mark" onClick={showHome} type="button"><span /></button>
      <nav aria-label="Główna nawigacja" className="main-navigation">
        {navigation.map(({ icon, label, to }) => to ? (
          <NavLink className={({ isActive }) => isActive ? 'navigation-item navigation-item--active' : 'navigation-item'} end={to === APP_ROUTES.home} key={label} onClick={showHome} to={to}>
            <Icon name={icon} size={21} /><span>{label}</span>
          </NavLink>
        ) : (
          <button className="navigation-item" disabled key={label} type="button"><Icon name={icon} size={21} /><span>{label}</span></button>
        ))}
      </nav>
      <div className="sidebar-playlists red-scroll-bar">
        {playlists?.map((playlist) => (
          <Playlists key={playlist.playlist_id} playlist={playlist} choosePlaylist={choosePlaylist} />
        ))}
      </div>
      <div className="sidebar-footer">
        <button onClick={displayCreatingPlaylistWindow} className="create_playlist_button" type="button"><Icon name="plus" size={19} /><span>Stwórz playlistę</span></button>
        <button className="sidebar-profile" onClick={() => setSigning(true)} type="button">
          <span className="sidebar-profile__avatar">{isLogedIn ? 'K' : '?'}</span>
          <span>{isLogedIn ? 'Konto' : 'Zaloguj się'}</span>
          <Icon name="chevronRight" size={16} />
        </button>
      </div>
    </aside>
  );
}
