export default function Inputs({ informationForm, setInformationForm }) {

    const handleInformationForm = (e) => {
        setInformationForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    return (
        <div className="details  flex flex-1 flex-col justify-evenly">
            <div>
                <span className="text-[1.6rem]">Title Of Your Song</span>
                <input onChange={() => handleInformationForm(event)} name="song_name" type="text" placeholder={`${informationForm.song_name || 'Title'}`} />

            </div>
            <div>
                <span className="text-[1.6rem]">Credit</span>
                <input onChange={() => handleInformationForm(event)} name="credit" type="text" placeholder={`${informationForm.credit || 'Credit'}`} />

            </div>
            <div>
                <span className="text-[1.6rem]">Choose Your Album If You Want</span>
                <select name="album_id" onChange={() => handleInformationForm(event)} value={`${informationForm.album_id || null}`}>

                    <option value="" disabled hidden>--choose album you want to connect---</option>
                    <option value="dont connect">don't connect</option>
                    <option value="1">dark nights</option>
                    <option value="2">sunny freestyles</option>

                </select>

            </div>
        </div>
    )
}