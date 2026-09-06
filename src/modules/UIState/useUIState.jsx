import { useState } from 'react'
export function useUIState() {
    const [signing, setSigning] = useState(false);
    const [showCreatePlaylistWindow, setShowCreatePlaylistWindow] = useState(false);
    const [reloadAside, setReloadAside] = useState(false)
    const [show, setShow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [queueOpen, setQueueOpen] = useState(false)

    const clickedAccount = () => {
        signing ? setSigning(false) : setSigning(true)
    }

    return (
        {
            signing, setSigning,
            showCreatePlaylistWindow, setShowCreatePlaylistWindow,
            reloadAside, setReloadAside,
            show, setShow,
            sidebarOpen, setSidebarOpen,
            queueOpen, setQueueOpen,
            clickedAccount
        }
    )
}
