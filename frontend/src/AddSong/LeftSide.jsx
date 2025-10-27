import {useNavigate } from 'react-router'
export default function LeftSide({ setTabName}) {
    const navigate = useNavigate()

    const chooseTab = (e)=>{
        setTabName(e.target.innerText)
    }
    
    return (
        <div className="left-side flex-3 text-[var(--help-color)]  ">
            <div onClick={()=>chooseTab(event)} className="left-tab information-tab  h-[25%]">
                <span >INFORMATION</span>
            </div>
            <div  onClick={()=>chooseTab(event)} className="left-tab file-tab w-full h-[25%] ">
                <span>FILE</span>
            </div>
            <div  onClick={()=>chooseTab(event)} className="left-tab preview-tab w-full h-[40%] ">
                <span>PREVIEW</span>
            </div>
            <div onClick={()=>{navigate('/')}} className=" back-tab 
            ">
                <span>BACK</span>
            </div>
        </div>
    )
}