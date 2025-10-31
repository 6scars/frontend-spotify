import { useState, useRef, useEffect } from 'react'
import "./AddSong.css";
import LeftSide from "./AddSong/LeftSide.jsx"
import RightSide from "./AddSong/RightSide.jsx"
export default function AddSong() {
    const [tabName, setTabName] = useState('INFORMATION');
    const [addSongForm, setAddSongForm] = useState({
        song_name: '',
        credit: '',
        album_id: '',
        album_name: '',
        imgUrl: 'https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/import-here.svg',
        importedSongUrlBlob: '',
        importedSongNameFile: ''
    })

    useEffect(() => {
        const getAuthorsAlbums = async () => {
            const response = await fetch('http://localhost:3005/api/getAuthorsAlbums', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": "application/json"
                }
            })
        }
    }, [])


    return (
        <>
            <div className="add-song-container flex items-center justify-center w-full h-full ">
                <div className="w-[90vw] h-[75vh] bg-[var(--background-color)]
                    rounded-3xl overflow-hidden flex 
                ">
                    <LeftSide tabName={tabName} setTabName={setTabName} addSongForm={addSongForm} />
                    <RightSide
                        tabName={tabName}
                        addSongForm={addSongForm}
                        setAddSongForm={setAddSongForm}
                    />

                </div>
            </div>

        </>
    )
}