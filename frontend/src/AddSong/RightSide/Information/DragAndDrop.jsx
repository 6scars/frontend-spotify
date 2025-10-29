import {useState, useEffect} from 'react'
import Image from './Image';
export default function DragAndDrop({inputFile,dragAndDropEl,imgUrl,setImgUrl,informationForm }) {

    useEffect(() => {
        const handleFileChange = () => {
            let imgLink = URL.createObjectURL(inputFile.current.files[0]);
            setImgUrl(imgLink);
        }
        const handleDragOver = (e) => { e.preventDefault() }
        const handleDrop = (e) => {
            e.preventDefault()
            let imgLink = URL.createObjectURL(e.dataTransfer.files[0]);
            setImgUrl(imgLink)
        }


        inputFile.current.addEventListener("change", handleFileChange)
        dragAndDropEl.current.addEventListener('dragover', handleDragOver)
        dragAndDropEl.current.addEventListener('drop', handleDrop)
        return () => {
            if (inputFile.current) inputFile.current.removeEventListener("change", handleFileChange)
            if (dragAndDropEl.current) dragAndDropEl.current.removeEventListener('dragover', handleDragOver)
            if (dragAndDropEl.current) dragAndDropEl.current.removeEventListener('drop', handleDrop)
        }
    }, [])

    return (
        <div
            ref={dragAndDropEl}
            className="import-photo flex items-center justify-center flex-1 w-full  overflow-hidden"
        >
            <label className="h-full w-full" htmlFor="input-file" id="img-view">
                <div className="song-container-inner w-full h-full  flex items-center justify-center flex-col rounded-xl ">
                    <Image imgUrl={imgUrl} />

                    <div
                        className="authors-container  h-[25%] text-gray-700 font-bold flex items-center
                                                            flex flex-col"
                    >
                        <div className=" text-[0.8rem] text-[var(--main-color)]">
                            {informationForm.song_name || 'title'}
                        </div>
                        <p className="  text-[0.7rem] authors__text ">
                            author_name
                        </p>
                        <p className="text-[0.7rem] text-white font-thin"> {`${informationForm.credit || 'credit'}`}</p>
                    </div>
                </div>
            </label>
            <input ref={inputFile} className="hidden" type="file" id="input-file" />
        </div>
    )
}