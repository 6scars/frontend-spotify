import { useEffect } from "react";

import AppShell     from "./app/AppShell.jsx";
import Header       from "./widgets/Header/Header.jsx";
import Aside        from "./widgets/Aside/Aside.jsx";
import Center       from "./widgets/Center/Center.jsx";
import Play         from "./widgets/Play/Play.jsx";
import QueuePanel   from "./widgets/Queue/QueuePanel.jsx";
import Signing      from "./widgets/Signing/Signing.jsx";

import { useAuthContext }             from "./modules/Auth/useAuthContext.js";
import { useUIStateContext }          from "./modules/UIState/useUIStateContext.js";
import { useCurrentPlaybackContext }  from "./modules/CurrentPlayback/useCurrentPlaybackContext.js";


export default function MiniSpotify() {
  const { setIsLogedIn, playlists, fetchAuthState } = useAuthContext();
  const { signing, setShowCreatePlaylistWindow, setShowPlaylistDescribing, reloadAside, reloadApp } = useUIStateContext();
  const { currentSong } = useCurrentPlaybackContext()

  useEffect(() => {
    setIsLogedIn(false);
    setShowCreatePlaylistWindow(false)
    setShowPlaylistDescribing(false)

    const fetch = async () => {
      await fetchAuthState()
    }
    fetch();
  }, [reloadAside, reloadApp]);


  return (
    <AppShell
      header={<Header />}
      overlay={signing ? <Signing /> : null}
      player={currentSong ? <Play /> : null}
      queue={<QueuePanel />}
      sidebar={playlists ? <Aside /> : null}
    >
      <Center />
    </AppShell>
  );
}
