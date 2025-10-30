import { useState, useRef } from 'react'
import "./AddSong.css";
import LeftSide from "./AddSong/LeftSide.jsx"
import RightSide from "./AddSong/RightSide.jsx"
export default function AddSong() {
    const [tabName, setTabName] = useState('INFORMATION');
    const [imgUrl, setImgUrl] = useState("https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/import-here.svg")
    const [addSongForm, setAddSongForm] = useState({
        song_name: '',
        credit: '',
        album_id: '',
        album_name: '',
        importedSongUrlBlob:'',
        importedSongNameFile:''
    })
    const [importedSong, setImportedSong] = useState(null)
    const inputFile = useRef(null);
    const dragAndDropEl = useRef(null);


    return (
        <>
            <div className="add-song-container flex items-center justify-center w-full h-full ">
                <div className="w-[90vw] h-[75vh] bg-[var(--background-color)]
                    rounded-3xl overflow-hidden flex 
                ">
                    <LeftSide tabName={tabName} setTabName={setTabName} addSongForm={addSongForm} />
                    <RightSide
                        setImportedSong={setImportedSong}
                        importedSong={importedSong}
                        tabName={tabName}
                        inputFile={inputFile}
                        dragAndDropEl={dragAndDropEl}
                        imgUrl={imgUrl}
                        setImgUrl={setImgUrl}
                        addSongForm={addSongForm}
                        setAddSongForm={setAddSongForm}
                    />

                </div>
            </div>

        </>
    )
}