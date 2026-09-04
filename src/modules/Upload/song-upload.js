const imageTypes = new Set(['image/jpeg', 'image/png'])

export function validateSongUpload({ audioFile, imageFile, song_name }) {
  const errors = {}

  if (String(song_name || '').trim().length < 5) errors.song_name = 'Tytuł musi mieć co najmniej 5 znaków.'
  if (!imageFile) errors.imageFile = 'Dodaj okładkę w formacie JPG lub PNG.'
  else if (!imageTypes.has(imageFile.type)) errors.imageFile = 'Okładka musi być plikiem JPG lub PNG.'
  if (!audioFile) errors.audioFile = 'Dodaj nagranie w formacie MP3.'
  else if (audioFile.type !== 'audio/mpeg' && !audioFile.name?.toLocaleLowerCase().endsWith('.mp3')) errors.audioFile = 'Nagranie musi być plikiem MP3.'

  return errors
}
