import { useCurrentPlaybackContext } from "../../modules/CurrentPlayback/useCurrentPlaybackContext.js";
import { useAuthContext } from "../../modules/Auth/useAuthContext.js";
import { useUIStateContext } from "../../modules/UIState/useUIStateContext.js";
import Icon from '../../shared/ui/Icon.jsx'
import "./Aside.css";
import Playlists from './PlayLists'

const navigation = [
  ['home', 'Dla Ciebie', true],
  ['discover', 'Odkrywaj', false],
  ['library', 'Biblioteka', false],
  ['heart', 'Ulubione', false],
  ['playlists', 'Playlisty', false],
  ['radio', 'Radio', false],
]

export default function Aside() {
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
    setShowPlaylistDescribing(true);
  };

  const showHome = () => {
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)
  }

  return (
    <aside className="leftBar">
      <button aria-label="Strona główna" className="brand-mark" onClick={showHome} type="button"><span /></button>
      <nav aria-label="Główna nawigacja" className="main-navigation">
        {navigation.map(([icon, label, active]) => (
          <button
            aria-current={active ? 'page' : undefined}
            className={active ? 'navigation-item navigation-item--active' : 'navigation-item'}
            disabled={!active}
            key={label}
            onClick={active ? showHome : undefined}
            type="button"
          >
            <Icon name={icon} size={21} /><span>{label}</span>
          </button>
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
