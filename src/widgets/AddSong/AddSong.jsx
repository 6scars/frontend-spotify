import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { APP_ROUTES } from '../../app/routes.js'
import { BACKEND_URL } from '../../config.js'
import { validateSongUpload } from '../../modules/Upload/song-upload.js'
import Icon from '../../shared/ui/Icon.jsx'
import UploadField from './UploadField.jsx'
import UploadReview from './UploadReview.jsx'
import './AddSong.css'

const steps = [
  { id: 'details', label: 'Informacje' },
  { id: 'files', label: 'Pliki' },
  { id: 'review', label: 'Podgląd' },
]

function useObjectUrl(file) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!file) {
      setUrl(null)
      return undefined
    }
    const nextUrl = URL.createObjectURL(file)
    setUrl(nextUrl)
    return () => URL.revokeObjectURL(nextUrl)
  }, [file])

  return url
}

export default function AddSong() {
  const [activeStep, setActiveStep] = useState('details')
  const [albumsInfo, setAlbumsInfo] = useState([])
  const [audioFile, setAudioFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [errors, setErrors] = useState({})
  const [requestState, setRequestState] = useState({ status: 'idle', message: '' })
  const [form, setForm] = useState({ song_name: '', credit: '', album_id: '', album_name: '' })
  const audioUrl = useObjectUrl(audioFile)
  const imageUrl = useObjectUrl(imageFile)
  const hasToken = Boolean(localStorage.getItem('jwt'))

  useEffect(() => {
    const controller = new AbortController()

    async function loadAlbums() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/getAuthorsAlbums`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Nie udało się pobrać albumów')
        const data = await response.json()
        if (!controller.signal.aborted) setAlbumsInfo(Array.isArray(data?.data) ? data.data : [])
      } catch (error) {
        if (!controller.signal.aborted) setRequestState({ status: 'error', message: error.message })
      }
    }

    if (hasToken) loadAlbums()
    return () => controller.abort()
  }, [hasToken])

  const updateField = (event) => {
    const { name, value } = event.target
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  const chooseAlbum = (event) => {
    const albumId = event.target.value
    const album = albumsInfo.find((item) => String(item.id) === albumId)
    setForm((currentForm) => ({ ...currentForm, album_id: albumId, album_name: album?.album_name || '' }))
  }

  const sendSong = async () => {
    const validationErrors = validateSongUpload({ ...form, audioFile, imageFile })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length) {
      setRequestState({ status: 'error', message: 'Uzupełnij wymagane informacje i pliki.' })
      return
    }

    const legacyForm = {
      ...form,
      imgUrl: imageUrl,
      importedSongUrlBlob: audioUrl,
      importedSongNameFile: audioFile.name,
    }
    const formData = new FormData()
    Object.entries(legacyForm).forEach(([key, value]) => value && formData.append(key, value))
    formData.append('mp3', audioFile, audioFile.name)
    formData.append('img', imageFile, imageFile.name)
    formData.append('addSongForm', JSON.stringify(legacyForm))
    formData.append('token', localStorage.getItem('jwt'))
    setRequestState({ status: 'pending', message: '' })

    try {
      const response = await fetch(`${BACKEND_URL}/api/saveSongInBase`, { method: 'POST', body: formData })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Nie udało się dodać utworu')
      setRequestState({ status: 'success', message: data.message || 'Utwór został przesłany.' })
    } catch (error) {
      setRequestState({ status: 'error', message: error.message || 'Nie udało się połączyć z serwerem.' })
    }
  }

  if (!hasToken) {
    return <main className="song-upload song-upload--guest"><Icon name="plus" size={38} /><h1>Zaloguj się, aby dodać utwór</h1><p>Przesyłanie muzyki jest dostępne dla uwierzytelnionych kont twórców.</p><Link className="button button--primary" to={APP_ROUTES.home}>Wróć do aplikacji</Link></main>
  }

  return (
    <main className="song-upload">
      <aside className="song-upload__sidebar"><Link aria-label="Wróć do aplikacji" className="song-upload__back" to={APP_ROUTES.account}><Icon name="chevronLeft" size={18} /></Link><div className="song-upload__brand"><span /><strong>NORII</strong></div><nav aria-label="Etapy dodawania utworu">{steps.map((step, index) => <button aria-current={activeStep === step.id ? 'step' : undefined} key={step.id} onClick={() => setActiveStep(step.id)} type="button"><span>0{index + 1}</span>{step.label}</button>)}</nav><small>MP3 · JPG · PNG</small></aside>
      <section className="song-upload__workspace">
        <header><span>DODAJ NOWY UTWÓR</span><h1>Opublikuj muzykę</h1><p>Przygotuj informacje, pliki i sprawdź podgląd przed wysłaniem.</p></header>

        {activeStep === 'details' ? <div className="song-upload__panel upload-details"><label><span>Tytuł utworu *</span><input name="song_name" onChange={updateField} placeholder="Np. Cienie miasta" type="text" value={form.song_name} />{errors.song_name ? <em>{errors.song_name}</em> : null}</label><label><span>Opis / informacje o prawach</span><textarea name="credit" onChange={updateField} placeholder="Autorzy, producenci, prawa…" rows="4" value={form.credit} /></label><label><span>Połącz z albumem</span><select name="album_id" onChange={chooseAlbum} value={form.album_id}><option value="">Bez albumu</option>{albumsInfo.map((album) => <option key={album.id} value={album.id}>{album.album_name}</option>)}</select></label></div> : null}

        {activeStep === 'files' ? <div className="song-upload__panel upload-files"><UploadField accept="image/jpeg,image/png,.jpg,.jpeg,.png" error={errors.imageFile} file={imageFile} hint="JPG lub PNG · kliknij albo przeciągnij" id="song-cover" label="Dodaj okładkę" onFile={(file) => { setImageFile(file); setErrors((current) => ({ ...current, imageFile: undefined })) }} /><UploadField accept="audio/mpeg,.mp3" error={errors.audioFile} file={audioFile} hint="MP3 · kliknij albo przeciągnij" id="song-audio" label="Dodaj nagranie" onFile={(file) => { setAudioFile(file); setErrors((current) => ({ ...current, audioFile: undefined })) }} /></div> : null}

        {activeStep === 'review' ? <div className="song-upload__panel"><UploadReview audioUrl={audioUrl} form={form} imageUrl={imageUrl} /></div> : null}

        <footer className="song-upload__footer"><div>{requestState.message ? <p className={`song-upload__message song-upload__message--${requestState.status}`} role="status">{requestState.message}</p> : null}</div><div><button className="button button--quiet" onClick={() => setActiveStep(steps[Math.max(0, steps.findIndex((step) => step.id === activeStep) - 1)].id)} type="button">Wstecz</button>{activeStep !== 'review' ? <button className="button button--primary" onClick={() => setActiveStep(steps[Math.min(steps.length - 1, steps.findIndex((step) => step.id === activeStep) + 1)].id)} type="button">Dalej</button> : <button className="button button--primary" disabled={requestState.status === 'pending'} onClick={sendSong} type="button">{requestState.status === 'pending' ? 'Wysyłanie…' : 'Wyślij utwór'}</button>}</div></footer>
      </section>
    </main>
  )
}
