import { useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '../../../app/routes.js'
import Icon from '../../../shared/ui/Icon.jsx'
import './AccountOptions.css'

export default function AccountOptions({ clickedAccount }) {
  const navigate = useNavigate()

  const goTo = (route) => {
    clickedAccount()
    navigate(route)
  }

  const logOut = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('jwt')
    window.location.reload()
  }

  return (
    <section aria-label="Menu konta" className="account-menu">
      <button aria-label="Zamknij menu konta" className="account-menu__close icon-button" onClick={clickedAccount} type="button"><Icon name="plus" size={19} /></button>
      <span className="account-menu__avatar">K</span>
      <h2>Twoje konto</h2>
      <p>Zarządzaj muzyką i preferencjami.</p>
      <nav>
        <button onClick={() => goTo(APP_ROUTES.account)} type="button">Konto <Icon name="chevronRight" size={17} /></button>
        <button onClick={() => goTo(APP_ROUTES.addSong)} type="button">Dodaj utwór <Icon name="chevronRight" size={17} /></button>
        <button onClick={() => goTo(APP_ROUTES.settings)} type="button">Ustawienia <Icon name="chevronRight" size={17} /></button>
      </nav>
      <button className="account-menu__logout" onClick={logOut} type="button">Wyloguj się</button>
    </section>
  )
}
