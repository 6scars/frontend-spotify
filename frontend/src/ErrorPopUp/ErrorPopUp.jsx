import { useState } from "react"
import ReactDOM from "react-dom"
import './ErrorPopUp.css'

export default function ErrorPopUp() {
  const container = document.getElementById("errorPopup")
  console.log(container)


  if (!container) return null

  return ReactDOM.createPortal(
    <div className={`notification-container`}>
        <p>there is no songs in playlist</p>
    </div>,
    container
  )
}
