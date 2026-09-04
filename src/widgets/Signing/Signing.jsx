import { useEffect, useState } from 'react'

import { BACKEND_URL } from '../../config.js'
import { useAuthContext } from '../../modules/Auth/useAuthContext.js'
import { useUIStateContext } from '../../modules/UIState/useUIStateContext.js'
import AccountOptions from './AccountOptions/AccountOptions.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import './Signing.css'

export default function Signing({ defaultMode = 'signin', onClose, onModeChange, presentation = 'overlay' }) {
  const [fetchRespond, setFetchRespond] = useState(null)
  const [formValue, setFormValue] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [switchForm, setSwitchForm] = useState(defaultMode === 'signup')
  const { isLogedIn } = useAuthContext()
  const { clickedAccount } = useUIStateContext()
  const close = onClose || clickedAccount

  useEffect(() => {
    setSwitchForm(defaultMode === 'signup')
  }, [defaultMode])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [close])

  const signForm = (event) => {
    setFetchRespond(null)
    setFormValue((currentValue) => ({ ...currentValue, [event.target.name]: event.target.value }))
  }

  const changeForm = (nextValue) => {
    setFetchRespond(null)
    if (onModeChange) onModeChange(nextValue ? 'signup' : 'signin')
    else setSwitchForm(nextValue)
  }

  const sendForm = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFetchRespond(null)

    try {
      const endpoint = switchForm ? 'newAccount' : 'signin'
      const response = await fetch(`${BACKEND_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValue),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Nie udało się połączyć z kontem')

      if (data.token) {
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('user_id', data.user_id)
        window.location.reload()
        return
      }

      setFetchRespond(data.message || (switchForm ? 'Konto utworzone. Możesz się zalogować.' : 'Brak tokenu w odpowiedzi serwera.'))
      if (switchForm) setSwitchForm(false)
    } catch (error) {
      setFetchRespond(error.message || 'Nie udało się połączyć z serwerem')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLogedIn) return <div className="auth-overlay"><button aria-label="Zamknij menu konta" className="auth-overlay__backdrop" onClick={close} type="button" /><AccountOptions clickedAccount={close} /></div>

  const formProps = {
    clickedAccount: close,
    embedded: presentation === 'page',
    fetchRespond,
    formValue,
    isSubmitting,
    sendForm,
    setSwitchForm: changeForm,
    signForm,
  }

  const form = switchForm ? <SignUp {...formProps} /> : <SignIn {...formProps} />

  if (presentation === 'page') {
    return <div className="auth-page"><section className="auth-page__visual"><div className="auth-page__brand"><span /><strong>NOIR</strong></div><div><span>{switchForm ? 'NOWY ROZDZIAŁ' : 'TWOJA MUZYKA'}</span><h1>{switchForm ? 'Zacznij słuchać po swojemu.' : 'Wróć do dźwięków, które są Twoje.'}</h1><p>Ciemna przestrzeń dla muzyki, bez zbędnego hałasu.</p></div><i aria-hidden="true" /></section><main className="auth-page__form">{form}</main></div>
  }

  return <div className="auth-overlay"><button aria-label="Zamknij formularz" className="auth-overlay__backdrop" onClick={close} type="button" />{form}</div>
}
