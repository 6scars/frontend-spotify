import ReactDOM               from "react-dom"
import                             './Toast.css'

export default function Toast({message}) {
  const container = document.getElementById("errorPopup")



  if (!container) return null
  console.log("new ErrorPopUp message:", message)

  return ReactDOM.createPortal(
    <div className={"notification-container"}>
        <p>{message}</p>
    </div>,
    container
  )
}
