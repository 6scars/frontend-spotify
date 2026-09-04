import test from 'node:test'
import assert from 'node:assert/strict'

import { APP_ROUTES } from '../src/app/routes.js'

test('podstawowe trasy zachowują Home i istniejący formularz dodawania utworu', () => {
  assert.deepEqual(APP_ROUTES, {
    home: '/',
    discover: '/discover',
    library: '/library',
    playlists: '/playlists',
    addSong: '/addSong',
  })
})
