export default function Inputs({ albumsInfo, addSongForm, setAddSongForm }) {

    const handleAddSongForm = (e) => {
        setAddSongForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className="details  flex flex-1 flex-col justify-evenly">
            <div>
                <span className="text-[1.6rem]">Title Of Your Song</span>
                <input onChange={() => handleAddSongForm(event)} name="song_name" type="text" placeholder={`${addSongForm.song_name || 'Title'}`} />

            </div>
            <div>
                <span className="text-[1.6rem]">Credit</span>
                <input onChange={() => handleAddSongForm(event)} name="credit" type="text" placeholder={`${addSongForm.credit || 'Credit'}`} />

            </div>
            <div>
                <span className="text-[1.6rem]">Choose Your Album If You Want</span>
                <select name="album_id" onChange={() => handleAddSongForm(event)} value={`${addSongForm.album_id || null}`}>

                    <option value="" disabled hidden>--choose album you want to connect---</option>
                    <option value="dont connect">don't connect</option>
                    {albumsInfo?.map((albumInfo) => (
                        <option key={albumInfo.id} value={`${albumInfo.id}`}>
                            {`${albumInfo.album_name}`}
                        </option>
                    ))}

                </select>

            </div>
        </div >
    )
}