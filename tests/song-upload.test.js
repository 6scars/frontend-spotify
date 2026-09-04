import test from 'node:test'
import assert from 'node:assert/strict'

import { validateSongUpload } from '../src/modules/Upload/song-upload.js'

const imageFile = { name: 'cover.png', type: 'image/png' }
const audioFile = { name: 'song.mp3', type: 'audio/mpeg' }

test('formularz utworu akceptuje kompletny zestaw JPG/PNG i MP3', () => {
  assert.deepEqual(validateSongUpload({ song_name: 'Cienie', imageFile, audioFile }), {})
  assert.deepEqual(validateSongUpload({ song_name: 'Cienie', imageFile: { ...imageFile, type: 'image/jpeg' }, audioFile }), {})
})

test('formularz utworu zwraca błędy braków i nieprawidłowych formatów', () => {
  assert.deepEqual(validateSongUpload({
    song_name: 'abc',
    imageFile: { name: 'cover.webp', type: 'image/webp' },
    audioFile: { name: 'song.wav', type: 'audio/wav' },
  }), {
    song_name: 'Tytuł musi mieć co najmniej 5 znaków.',
    imageFile: 'Okładka musi być plikiem JPG lub PNG.',
    audioFile: 'Nagranie musi być plikiem MP3.',
  })
})
