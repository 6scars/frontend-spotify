import { useEffect, useRef } from 'react'
import Image from './Image';
export default function DragAndDrop({ addSongForm, setAddSongForm }) {
    const inputFile = useRef(null);
    const dragAndDropEl = useRef(null);

    useEffect(() => {
        const inputFileElement = inputFile.current
        const dragAndDropElement = dragAndDropEl.current

        /*-----Change or add mp3 file-------*/
        const handleFileChange = () => {
            let imgLink = URL.createObjectURL(inputFileElement.files[0]);
            setAddSongForm(prev => ({
                ...prev,
                imgUrl: imgLink
            }));
        }
        /*-----Change or add mp3 file by drop-------*/
        const handleDrop = (e) => {
            e.preventDefault()
            let imgLink = URL.createObjectURL(e.dataTransfer.files[0]);
            setAddSongForm(prev => ({
                ...prev,
                imgUrl: imgLink
            }));
        }
        /*------Do nothing if is over the element-------*/
        const handleDragOver = (e) => { e.preventDefault() }


        /*---------Event listener on elements-------------*/
        inputFileElement.addEventListener("change", handleFileChange)
        dragAndDropElement.addEventListener('dragover', handleDragOver)
        dragAndDropElement.addEventListener('drop', handleDrop)
        return () => {
            if (inputFileElement) inputFileElement.removeEventListener("change", handleFileChange)
            if (dragAndDropElement) dragAndDropElement.removeEventListener('dragover', handleDragOver)
            if (dragAndDropElement) dragAndDropElement.removeEventListener('drop', handleDrop)
        }
    }, [])

    return (
        <div
            ref={dragAndDropEl}
            className="import-photo flex items-center justify-center flex-1 min-h-[250px] min-w-[250px] w-full  overflow-hidden"
        >
            <label className="h-full w-full" htmlFor="input-file" id="img-view">
                <div className="song-container-inner w-full h-full  flex items-center justify-center flex-col rounded-xl ">
                    <Image imgUrl={addSongForm.imgUrl} />

                    <div
                        className="authors-container  h-[25%] text-gray-700 font-bold flex items-center flex flex-col" >
                        <div className=" text-[0.8rem] text-[var(--main-color)]">
                            {addSongForm.song_name || 'title'}
                        </div>
                        <p className="  text-[0.7rem] authors__text ">
                            author_name
                        </p>
                        <p className="text-[0.7rem] text-white font-thin">
                            {`${addSongForm.credit || 'credit'}`}
                        </p>
                    </div>
                </div>
            </label>

            <input ref={inputFile} className="hidden" type="file" id="input-file" />
        </div>
    )
}
