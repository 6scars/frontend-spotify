import Image from './Information/Image'
import ImportedMp3 from './File/ImportedMp3'
export default function Preview({ addSongForm }) {
    return (
        <>
            <div className=" flex flex-col items-center justify-center w-full h-full ">
                <div className="w-[50%] flex items-center justify-center">
                    <Image imgUrl={addSongForm.imgUrl} />
                </div>

                <div>
                    <ImportedMp3 addSongForm={addSongForm}/>
                </div>
            </div>
        </>
    )
}