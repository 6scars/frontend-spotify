import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

export default function LeftSide({ tabName, setTabName, addSongForm }) {
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(null)

  /*--------choose Tab function add/remove style-------*/
  const chooseTab = (e) => {
    const clickedDiv = e.currentTarget // <-- use currentTarget
    setTabName(clickedDiv.innerText)

    if (currentTab) 
      currentTab.classList.remove('active-tab')
    
    clickedDiv.classList.add('active-tab')
    setCurrentTab(clickedDiv)
  }

  
  useEffect(() => {
    /*------Choose Tab function for INFORMATION div at start-------*/
    setCurrentTab(document.querySelector('.INFORMATION'))
  }, [])

  return (
    <div className="left-side flex-3 text-[var(--help-color)]">
      <div
        onClick={chooseTab}
        className="left-tab INFORMATION active-tab information-tab h-[25%]"
      >
        <span>INFORMATION</span>
      </div>
      <div
        onClick={chooseTab}
        className="left-tab FILE file-tab w-full h-[25%]"
      >
        <span>FILE</span>
      </div>
      <div
        onClick={chooseTab}
        className="left-tab PREVIEW preview-tab w-full h-[40%]"
      >
        <span>PREVIEW</span>
      </div>
      <div onClick={() => navigate('/')} className="back-tab">
        <span>BACK</span>
      </div>
    </div>
  )
}
