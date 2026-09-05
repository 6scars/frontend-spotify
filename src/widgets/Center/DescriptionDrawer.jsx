import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { useCurrentPlaybackContext } from '../../modules/CurrentPlayback/useCurrentPlaybackContext.js'
import { useUIStateContext } from '../../modules/UIState/useUIStateContext.js'
import { getSongId } from '../../modules/Catalog/song.js'
import Icon from '../../shared/ui/Icon.jsx'
import Description from './Description.jsx'
import './DescriptionDrawer.css'

export default function DescriptionDrawer({ isOpen, compact }) {
  const { currentSong } = useCurrentPlaybackContext()
  const { setShow } = useUIStateContext()
  const { pathname } = useLocation()
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const returnFocus = useRef(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current !== pathname) setShow(false)
    previousPath.current = pathname
  }, [pathname, setShow])

  useEffect(() => {
    if (!isOpen) return
    returnFocus.current = document.activeElement
    closeRef.current?.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      if (event.target.closest?.('[role="dialog"], dialog, .queue-drawer, .show-add-song-container')) return
      event.preventDefault()
      setShow(false)
    }
    document.addEventListener('keydown', onKeyDown)
    const panel = panelRef.current
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (panel?.contains(document.activeElement)) {
        const target = returnFocus.current?.isConnected && !returnFocus.current.closest('[inert]')
          ? returnFocus.current : document.querySelector('.play-left-section .song-image-container')
        target?.focus({ preventScroll: true })
      }
    }
  }, [isOpen, setShow])

  return (
    <aside
      ref={panelRef}
      id="song-description"
      aria-labelledby="song-description-heading"
      aria-hidden={!isOpen}
      className={`description-drawer ${isOpen ? 'description-drawer--open' : ''}`}
      inert={!isOpen}
    >
      <header className="description-drawer__header">
        <h2 id="song-description-heading">O utworze</h2>
        <button ref={closeRef} className="description-close" onClick={() => setShow(false)} type="button">
          <Icon name={compact ? 'chevronLeft' : 'chevronRight'} size={19} />
          {compact ? 'Powrót' : 'Zwiń'}
        </button>
      </header>
      <div key={getSongId(currentSong)} className="description-drawer__scroll">
        {currentSong ? <Description key={getSongId(currentSong)} song={currentSong} onNavigate={() => setShow(false)} /> : null}
      </div>
    </aside>
  )
}
