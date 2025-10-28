import { useState, useRef } from 'react'
import "./AddSong.css";
import LeftSide from "./AddSong/LeftSide.jsx"
import RightSide from "./AddSong/RightSide.jsx"
export default function AddSong() {
    const [tabName, setTabName] = useState('INFORMATION');
    const inputFile = useRef(null);
    const dragAndDropEl = useRef(null);
    const [imgUrl, setImgUrl] = useState("https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/import-here.svg")
    const [informationForm, setInformationForm] = useState({
        song_name: '',
        credit: '',
        album_id: ''
    })

    const activeTab = tabName

    return (
        <>
            <div className="add-song-container flex items-center justify-center w-full h-full ">
                <div className="w-[90vw] h-[75vh] bg-[var(--background-color)]
                    rounded-3xl overflow-hidden flex 
                ">
                    <LeftSide tabName={tabName} setTabName={setTabName} informationForm={informationForm} />
                    <RightSide tabName={tabName} inputFile={inputFile} dragAndDropEl={dragAndDropEl} imgUrl={imgUrl} setImgUrl={setImgUrl} informationForm={informationForm} setInformationForm={setInformationForm} />

                </div>
            </div>

        </>
    )
}