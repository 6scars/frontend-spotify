const paths = {
  search: ['M21 21l-4.35-4.35', 'M10.8 18a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z'],
  home: ['M3 11.5 12 4l9 7.5', 'M5.5 10v10h13V10', 'M9.5 20v-6h5v6'],
  discover: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'm15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z'],
  library: ['M5 4v16', 'M10 4v16', 'M15 5l4 14'],
  heart: ['M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z'],
  playlists: ['M4 6h11', 'M4 11h11', 'M4 16h7', 'M18 13v7', 'M15 17h6'],
  radio: ['M8.2 8.2a5.4 5.4 0 0 0 0 7.6', 'M5.4 5.4a9.3 9.3 0 0 0 0 13.2', 'M12 12h.01'],
  plus: ['M12 5v14', 'M5 12h14'],
  chevronLeft: ['m15 18-6-6 6-6'],
  chevronRight: ['m9 18 6-6-6-6'],
  play: ['m9 7 8 5-8 5V7Z'],
  more: ['M5 12h.01', 'M12 12h.01', 'M19 12h.01'],
}

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      className="ui-icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {(paths[name] || []).map((path) => (
        <path key={path} d={path} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      ))}
    </svg>
  )
}
