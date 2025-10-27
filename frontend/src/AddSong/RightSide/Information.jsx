import './Information.css'
import { useState } from 'react'
export default function Information() {
    const [credited, setCredited] = useState(false);
    return (
        <>
            <div className="form-container text-white">
                <input  name="songName" placeholder='songName' type="text" />
                <input name="credit" placeholder='credit' type="checkbox" />
                <select >
                    <option value="">--Select one --</option>
                    <option value="album_id1">1</option>
                    <option value="album_id2">2</option>
                    <option value="album_id3">3</option>
                </select>
                <div>
                    import image
                </div>
            </div>

        </>
    )
}