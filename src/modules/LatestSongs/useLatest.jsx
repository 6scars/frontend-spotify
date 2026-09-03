import { useState } from 'react';

export function useLatest(limit = 6) {
  const stored = JSON.parse(localStorage.getItem("latest")) || [];
  const [latest, setLatest] = useState(stored);

  function latestListened(newSong) {
    setLatest(prev => {
      const index = prev.findIndex(s => s.id === newSong.id);
      let updated = [...prev];

      if (index !== -1) {
        // Song already exists → remove it
        updated.splice(index, 1);
      } else {
        // Song doesn't exist
        if (updated.length === limit) {
          updated.pop(); // remove last one
        }
      }

      updated = [newSong, ...updated];

      localStorage.setItem("latest", JSON.stringify(updated));
      return updated;
    });
  }

  return { latest, latestListened };
}
