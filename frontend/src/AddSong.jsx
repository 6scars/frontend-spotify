import { useState, useEffect } from 'react'

import LeftSide from "./AddSong/LeftSide.jsx"
import RightSide from "./AddSong/RightSide.jsx"

import "./AddSong.css";


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
    const [albumsInfo, setAlbumsInfo] = useState(null);

    useEffect(() => {
        const getAuthorsAlbums = async () => {
            const response = await fetch('https://spotify-backend-1-olcd.onrender.com/api/getAuthorsAlbums', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            setAlbumsInfo(data.data)
        }
        getAuthorsAlbums()
    }, [])


    return (
        <>
            <div className="add-song-container flex items-center justify-center w-full h-full ">
                <div className="w-[90vw] h-[75vh] bg-[var(--background-color)] rounded-3xl overflow-hidden flex  ">
                    <LeftSide tabName={tabName} setTabName={setTabName} addSongForm={addSongForm} />
                    <RightSide
                        albumsInfo={albumsInfo}
                        tabName={tabName}
                        addSongForm={addSongForm}
                        setAddSongForm={setAddSongForm}
                    />
                </div>
            </div>

        </>
    )
}