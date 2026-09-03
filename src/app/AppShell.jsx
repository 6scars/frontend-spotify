import './AppShell.css'

export default function AppShell({ sidebar, header, queue, player, overlay, children }) {
  return (
    <div className={`app-shell ${player ? 'app-shell--playing' : ''}`}>
      <div className="app-shell__sidebar">{sidebar}</div>
      <div className="app-shell__workspace">
        {header}
        {children}
      </div>
      <div className="app-shell__queue">{queue}</div>
      {player}
      {overlay}
    </div>
  )
}
