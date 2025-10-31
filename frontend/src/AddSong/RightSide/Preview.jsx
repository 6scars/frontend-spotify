import Image from './Information/Image'
import ImportedMp3 from './File/ImportedMp3'
import './Preview.css';
export default function Preview({ addSongForm }) {
    return (
        <>
            <div className="Preview flex flex-col items-center justify-center w-full h-full ">
                <div className="w-[50%] flex items-center justify-center">
                    <Image imgUrl={addSongForm.imgUrl} />
                </div>

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

                <div>
                    <ImportedMp3 addSongForm={addSongForm} />
                </div>

                <div className="button-container">
                    <button className="bg-white" >SEND SONG</button>

                </div>
            </div>
        </>
    )
}