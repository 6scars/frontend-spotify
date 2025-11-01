import Image from './Information/Image'
import ImportedMp3 from './File/ImportedMp3'
import './Preview.css';
export default function Preview({ addSongForm }) {
    async function blobFromUrl(blobUrl) {
        const res = await fetch(blobUrl);
        return await res.blob();
    }
    async function saveSongInBase() {
        const mp3Blob = await blobFromUrl(addSongForm.importedSongUrlBlob)
        const imgBlob = await blobFromUrl(addSongForm.imgUrl)


        const formData = new FormData();

        for (const key in addSongForm) {
            if (addSongForm[key] && typeof addSongForm[key] !== 'object') {
                formData.append(key, addSongForm[key])
            }
        }
        console.log(mp3Blob)
        console.log(imgBlob)

        formData.append('mp3', mp3Blob, addSongForm.importedSongNameFile || 'song.mp3')
        formData.append('img', imgBlob, 'cover.jpg');
        console.log(formData)
        await fetch('http://localhost:3005/api/saveSongInBase', {
            method: 'POST',
            body: formData
        })
        return
    }

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
                    <p className="text-[0.7rem] authors__text ">
                        author_name
                    </p>
                    <p className="text-[0.7rem] text-white font-thin">
                        {`${addSongForm.credit || 'credit'}`}
                    </p>
                    <p className="text-[0.7rem] authors__text ">
                        {`${addSongForm.album_name || 'album not Connected'}`}
                    </p>
                </div>

                <div>
                    <ImportedMp3 addSongForm={addSongForm} />
                </div>

                <div className="button-container">
                    <button onClick={saveSongInBase} className="bg-white" >SEND SONG</button>

                </div>
            </div>
        </>
    )
}