import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const readSource = (relativePath) => readFileSync(
  fileURLToPath(new URL(`../${relativePath}`, import.meta.url)),
  'utf8',
)

test('header spans the viewport while side panels stay outside the central layout flow', () => {
  const shell = readSource('src/app/AppShell.css')

  assert.match(shell, /\.app-shell__header\s*\{[^}]*grid-column:\s*1\s*\/\s*-1/s)
  assert.doesNotMatch(shell, /padding-right:\s*calc\(var\(--queue-handle-width\)/)
  assert.match(shell, /@media \(width < 1280px\)[\s\S]*\.app-shell__sidebar\s*\{[^}]*position:\s*fixed/)
})

test('small-screen aside is a toggleable overlay sized independently from the workspace', () => {
  const aside = readSource('src/widgets/Aside/Aside.jsx')
  const styles = readSource('src/widgets/Aside/Aside.css')

  assert.match(aside, /aria-controls="app-navigation"/)
  assert.match(aside, /aria-expanded=\{sidebarOpen\}/)
  assert.match(styles, /@media \(width < 768px\)[\s\S]*--aside-drawer-width:\s*78vw/)
  assert.match(styles, /\.aside-drawer--open\s+\.aside-drawer__surface\s*\{[^}]*transform:\s*translateX\(0\)/s)
})

test('queue uses one compact edge trigger and overlays nearly the full small viewport', () => {
  const queue = readSource('src/widgets/Queue/QueueDrawer.jsx')
  const styles = readSource('src/widgets/Queue/QueueDrawer.css')
  const queueIcons = queue.match(/<Icon name="queue"/g) ?? []

  assert.equal(queueIcons.length, 1)
  assert.doesNotMatch(queue, /queue-drawer__label|queue-drawer__count|chevronLeft/)
  assert.match(styles, /\.queue-drawer__trigger\s*\{[^}]*width:\s*var\(--queue-handle-width\)[^}]*height:\s*var\(--queue-handle-width\)/s)
  assert.doesNotMatch(styles, /queue-drawer--open\s+\.queue-drawer__trigger\s*\{[^}]*visibility:\s*hidden/s)
  assert.match(styles, /@media \(width < 768px\)[\s\S]*\.queue-drawer__surface\s*\{[^}]*width:\s*calc\(100vw - var\(--queue-handle-width\)\)/s)
})
