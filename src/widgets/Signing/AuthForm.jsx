import Icon from '../../shared/ui/Icon.jsx'

export default function AuthForm({
  clickedAccount,
  embedded = false,
  fetchRespond,
  formValue,
  isSubmitting,
  mode,
  sendForm,
  setSwitchForm,
  signForm,
}) {
  const isSignUp = mode === 'signup'

  return (
    <div aria-labelledby="auth-title" aria-modal={embedded ? undefined : 'true'} className={embedded ? 'auth-dialog auth-dialog--page' : 'auth-dialog'} role={embedded ? undefined : 'dialog'}>
      <button aria-label="Zamknij formularz" className="auth-dialog__close icon-button" onClick={clickedAccount} type="button"><Icon name="plus" size={20} /></button>
      <div className="auth-dialog__brand"><span /><strong>NORII</strong></div>
      <span className="auth-dialog__eyebrow">{isSignUp ? 'NOWE KONTO' : 'WITAJ PONOWNIE'}</span>
      <h2 id="auth-title">{isSignUp ? 'Zarejestruj się' : 'Zaloguj się'}</h2>
      <p className="auth-dialog__intro">{isSignUp ? 'Utwórz konto i buduj własne playlisty.' : 'Wróć do swojej muzyki i zapisanych kolekcji.'}</p>
      <form className="auth-form" onSubmit={sendForm}>
        <label><span>Adres e-mail</span><input autoComplete="email" autoFocus name="email" onChange={signForm} placeholder="twoj@email.pl" required type="email" value={formValue.email} /></label>
        <label><span>Hasło</span><input autoComplete={isSignUp ? 'new-password' : 'current-password'} name="password" onChange={signForm} placeholder="••••••••" required type="password" value={formValue.password} /></label>
        {fetchRespond ? <p className="auth-form__message" role="alert">{fetchRespond}</p> : null}
        <button className="button button--primary auth-form__submit" disabled={isSubmitting} type="submit">{isSubmitting ? 'Łączenie…' : isSignUp ? 'Utwórz konto' : 'Zaloguj się'}</button>
      </form>
      <p className="auth-dialog__switch">{isSignUp ? 'Masz już konto?' : 'Nie masz jeszcze konta?'} <button onClick={() => setSwitchForm(!isSignUp)} type="button">{isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}</button></p>
    </div>
  )
}
