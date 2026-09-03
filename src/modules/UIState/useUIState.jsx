import { useState } from 'react'
export function useUIState() {
    const [signing, setSigning] = useState(false);
    const [showCreatePlaylistWindow, setShowCreatePlaylistWindow] = useState(false);
    const [showPlaylistDescribing, setShowPlaylistDescribing] = useState(false);
    const [reloadAside, setReloadAside] = useState(false)
    const [reloadApp, setReloadApp] = useState(false)
    const [show, setShow] = useState(false);


    const [isLoading, setIsLoading] = useState(true); /* is used in playlistDescribing, if the Playlist is loading then isLoading = true */ 

    const clickedAccount = () => {
        signing ? setSigning(false) : setSigning(true)
    }

    return (
        {
            signing, setSigning,
            showCreatePlaylistWindow, setShowCreatePlaylistWindow,
            showPlaylistDescribing, setShowPlaylistDescribing,
            reloadAside, setReloadAside,
            reloadApp, setReloadApp,
            show, setShow,
            isLoading, setIsLoading,


            clickedAccount
        }
    )
}