import test from 'node:test'
import assert from 'node:assert/strict'

import { APP_ROUTES, getPlaylistRoute } from '../src/app/routes.js'

test('podstawowe trasy zachowują Home i istniejący formularz dodawania utworu', () => {
  assert.deepEqual(APP_ROUTES, {
    home: '/',
    discover: '/discover',
    library: '/library',
    favorites: '/favorites',
    playlists: '/playlists',
    playlist: '/playlists/:playlistId',
    radio: '/radio',
    addSong: '/addSong',
  })
})

test('szczegóły playlisty używają stabilnego i bezpiecznego identyfikatora', () => {
  assert.equal(getPlaylistRoute(42), '/playlists/42')
  assert.equal(getPlaylistRoute('nocne światła/2026'), '/playlists/nocne%20%C5%9Bwiat%C5%82a%2F2026')
})
