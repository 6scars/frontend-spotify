import { useState } from 'react';
import ImportedMp3 from './File/ImportedMp3';
export default function File({ setImportedSong }) {
    const [mp3File, setMp3File] = useState(null)
    const [mp3FileName, setMp3FileName] = useState(null)
    const handleChangeFile = (e) => {
        e.preventDefault()
        if (e.target.files[0].type === "audio/mpeg") {
            const mp3Url = URL.createObjectURL(e.target.files[0])
            setMp3File(mp3Url)
            setImportedSong(mp3File)
            console.log(e.target.files[0].name)
            setMp3FileName(e.target.files[0].name)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleOnDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            const mp3Url = URL.createObjectURL(e.dataTransfer.files[0])
            setMp3File(mp3Url)
            setMp3FileName(e.dataTransfer.files[0].name)
        }
        
    }


    return (
        <>
            <div className=" h-full w-full flex flex-col justify-center items-center gap-15">
                <h1 className="text-[3rem] text-white  flex-1"> Add MP3 File</h1>
                <label onDragOver={handleDragOver} onDrop={handleOnDrop} htmlFor="input-mp3-file" className="flex-10 flex justify-center items-center">
                    <div className="border-2 border-white border-dashed rounded-xl
                    flex ">
                        <img src="images/mp3Input.svg" />
                    </div>
                </label>
                <input className="hidden" onChange={handleChangeFile} type="file" id="input-mp3-file" accept=".mp3" />
                <div className="flex flex-col items-center justify-center text-white">
                    
                    {!mp3File ? '' : <ImportedMp3 mp3File={mp3File} mp3FileName={mp3FileName} />}
                </div>


            </div>
        </>
    )
}