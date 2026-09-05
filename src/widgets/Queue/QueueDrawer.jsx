import { useEffect, useId, useRef, useState } from 'react'

import { usePlaybackQueue } from '../../modules/Player/usePlaybackQueue.js'
import { formatQueueCount } from '../../modules/Player/playback-queue.js'
import { useUIStateContext } from '../../modules/UIState/useUIStateContext.js'
import Icon from '../../shared/ui/Icon.jsx'
import QueuePanel from './QueuePanel.jsx'
import './QueueDrawer.css'

export default function QueueDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const wasOpen = useRef(false)
  const panelId = useId()
  const playback = usePlaybackQueue()
  const { show } = useUIStateContext()

  useEffect(() => {
    if (show) setIsOpen(false)
  }, [show])

  const close = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (show) {
      wasOpen.current = false
      return
    }
    if (!isOpen) {
      if (wasOpen.current && !show) triggerRef.current?.focus({ preventScroll: true })
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    closeRef.current?.focus({ preventScroll: true })
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return
      if (event.target.closest?.('[role="dialog"], dialog')) return
      event.preventDefault()
      setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, show])

  return (
    <div className={`queue-drawer ${isOpen ? 'queue-drawer--open' : ''}`}>
      <button
        ref={triggerRef}
        className="queue-drawer__trigger"
        aria-label={`${isOpen ? 'Zwiń' : 'Otwórz'} kolejkę — ${formatQueueCount(playback.queue.length)}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => isOpen ? close() : setIsOpen(true)}
        type="button"
      >
        <span className="queue-drawer__label">Kolejka</span>
        <Icon name="chevronLeft" size={18} />
        <Icon name="queue" size={24} />
        <span className="queue-drawer__count">{playback.queue.length > 99 ? '99+' : playback.queue.length}</span>
      </button>
      <div id={panelId} className="queue-drawer__surface" inert={!isOpen} aria-hidden={!isOpen}>
        <QueuePanel playback={playback} onClose={close} closeRef={closeRef} />
      </div>
    </div>
  )
}
