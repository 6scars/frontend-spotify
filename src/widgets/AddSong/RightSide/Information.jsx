import './Information.css'
import Inputs from './Information/Inputs.jsx'
import DragAndDrop from './Information/DragAndDrop.jsx'

export default function Information({ albumsInfo, addSongForm, setAddSongForm }) {


    return (
        <>
            <div className="form-container flex flex-col gap-[5rem] ">
                <h1 className="text-center text-[2.4rem] h-[10%]"> Posting A Song</h1>
                <div className="h-[80%] flex flex-col">
                    <Inputs albumsInfo={albumsInfo} addSongForm={addSongForm} setAddSongForm={setAddSongForm}/>
                    <DragAndDrop addSongForm={addSongForm} setAddSongForm={setAddSongForm}/>
                </div>

            </div>

        </>
    )
}