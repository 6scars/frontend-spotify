import { useAuthContext } from '../contexts/AuthContext';
import { useUIStateContext } from '../contexts/UIStateContext'
import './Header.css'
import Sing from './Sing'


export default function Header() {

  const {clickedAccount, setReloadApp} = useUIStateContext();
  const {isLogedIn, setIsLogedIn} = useAuthContext();

  const handleHomeClick = ()=>{setReloadApp(prev => !prev)}
  return (
    <header
      className="fixed top-0 flex justify-betwen
        "
    >
      <div className="left-header">
        <div className="logo-container h-full w-[96px] flex justify-center items-center">
          <img  alt="logo" src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/logo1.svg" className="h-[90%] " />
        </div>
      </div>
      <div
        className="mid-header bg-black  flex-1 h-[full]
        flex justify-center
      "
      >
        <div
          className="home-search w-[500px]
        flex align-center justify-center
        "
        >
          <div className="h-full flex justify-center items-center">
            <img onClick={handleHomeClick} alt="home" src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/logohome.svg" className="h-[75%] cursor-pointer"></img>
          </div>
          <div className="h-full flex justify-center items-center">
            <input type="text" placeholder="Search" className="search__bar" />
          </div>
        </div>
      </div>
      <div className="right-header  min-w-[300px] h-full">
        <div className=" flex justify-end items-center h-full text-white">

          <Sing clickedAccount={clickedAccount} isLogedIn={isLogedIn}/>
        </div>
      </div>
    </header>
  );
}
