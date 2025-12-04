import Image from './Information/Image'
import ImportedMp3 from './File/ImportedMp3'
import './Preview.css';
export default function Preview({ addSongForm }) {
    async function blobFromUrl(blobUrl) {
        const res = await fetch(blobUrl);
        return await res.blob();
    }
    async function saveSongInBase() {
        if(addSongForm.song_name.length < 5){
            return {message: 'Song must have at least 6 characters'}
        }else if(!addSongForm.importedSongUrlBlob){
            return {message: 'Song must have music file'}
        }else if(!addSongForm.imgUrl){
            return {message: 'Song must have image'}
        }

        const mp3Blob = await blobFromUrl(addSongForm.importedSongUrlBlob)
        const imgBlob = await blobFromUrl(addSongForm.imgUrl)

        const formData = new FormData();

        for (const key in addSongForm) {
            if (addSongForm[key] && typeof addSongForm[key] !== 'object') {
                formData.append(key, addSongForm[key])
            }
        }

        formData.append('mp3', mp3Blob, addSongForm.importedSongNameFile || 'song.mp3')
        formData.append('img', imgBlob, 'cover.jpg');
        formData.append('addSongForm', JSON.stringify(addSongForm))
        formData.append('token', localStorage.getItem('jwt'))
        const response = await fetch('https://spotify-backend-1-olcd.onrender.com/api/fetchSongs/api/saveSongInBase', {
            method: 'POST',
            body: formData

        })
        const data = response.json()
        console.log(data.message);

        return data;
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

                <div className="importedMp3-container">
                    <ImportedMp3 addSongForm={addSongForm} />
                </div>

                <div className="button-container">
                    <button onClick={saveSongInBase} className="bg-white cursor-pointer" >SEND SONG</button>

                </div>
            </div>
        </>
    )
}