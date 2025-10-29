import './Information.css'
import Image from './Information/Image.jsx'
import Inputs from './Information/Inputs.jsx'
import DragAndDrop from './Information/DragAndDrop.jsx'
import { useEffect } from 'react'
export default function Information({ inputFile, dragAndDropEl, imgUrl, setImgUrl, informationForm, setInformationForm }) {


    return (
        <>
            <div className="form-container flex flex-col gap-[5rem] ">
                <h1 className="text-center text-[2.4rem] h-[10%]"> Posting A Song</h1>
                <div className="h-[80%] flex flex-col">
                    <Inputs informationForm={informationForm} setInformationForm={setInformationForm}/>
                    <DragAndDrop inputFile={inputFile} dragAndDropEl={dragAndDropEl} imgUrl={imgUrl} setImgUrl={setImgUrl} informationForm={informationForm}/>
                </div>

            </div>

        </>
    )
}