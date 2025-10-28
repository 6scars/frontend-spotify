import './Information.css'
import Image from './Image/Image.jsx'
import { useEffect } from 'react'
export default function Information({ inputFile, dragAndDropEl, imgUrl, setImgUrl, informationForm, setInformationForm }) {

    useEffect(() => {
        inputFile.current.addEventListener("change", () => {
            let imgLink = URL.createObjectURL(inputFile.current.files[0]);
            setImgUrl(imgLink);

        })
        dragAndDropEl.current.addEventListener('dragover', (e) => (e.preventDefault()))
        dragAndDropEl.current.addEventListener('drop', (e) => {
            e.preventDefault()
            let imgLink = URL.createObjectURL(e.dataTransfer.files[0]);

            setImgUrl(imgLink)

        })
    }, [])

    const handleInformationForm = (e) => {
        console.log(e.target.name)
        setInformationForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(informationForm)
    }

    return (
        <>
            <div className="form-container flex flex-col gap-[5rem] ">
                <h1 className="text-center text-[2.4rem]"> Posting A Song</h1>
                <div>
                    <div className="details  0 flex flex-1 flex-col justify-evenly">
                        <div>
                            <span className="text-[1.6rem]">Title Of Your Song</span>
                            <input onChange={() => handleInformationForm(event)} name="song_name" type="text" placeholder={`${informationForm.song_name || 'Title'}`} />

                        </div>
                        <div>
                            <span className="text-[1.6rem]">Credit</span>
                            <input onChange={() => handleInformationForm(event)} name="credit" type="text" placeholder="Credit" />

                        </div>
                        <div>
                            <span className="text-[1.6rem]">Choose Your Album If You Want</span>
                            <select onChange={() => null} value="Select album">

                                <option value="album_id">1</option>
                                <option value="album_id">2</option>
                                <option value="album_id">3</option>

                            </select>

                        </div>
                    </div>
                    <div ref={dragAndDropEl} className='import-photo flex  items-center justify-center'>
                        <label htmlFor="input-file" id="img-view">
                            <div className="w-full h-full" >
                                <div className="song-container-inner  rounded-xl ">
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
                                    </div>
                                </div>
                            </div>

                        </label>
                        <input ref={inputFile} className="hidden" type="file" id="input-file" />
                    </div>
                </div>

            </div>

        </>
    )
}