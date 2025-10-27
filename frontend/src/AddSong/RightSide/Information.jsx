import './Information.css'
import { useState } from 'react'

export default function Information() {
  const [songName, setSongName] = useState('')
  const [credited, setCredited] = useState(false)
  const [album, setAlbum] = useState('')
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission, e.g., send data to API
    console.log({ songName, credited, album, image })
  }

  return (
    <div className="form-container text-white p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Song Information</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Song Name */}
        <div className="flex flex-col">
          <label htmlFor="songName" className="mb-1 font-semibold">
            Song Name
          </label>
          <input
            id="songName"
            name="songName"
            placeholder="Enter song name"
            type="text"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            className="p-2 rounded-md border border-gray-400 text-black"
            required
          />
        </div>

        {/* Credit Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="credit"
            type="checkbox"
            checked={credited}
            onChange={(e) => setCredited(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="credit">Credit</label>
        </div>

        {/* Album Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="album" className="mb-1 font-semibold">
            Select Album
          </label>
          <select
            id="album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="p-2 rounded-md border border-gray-400 text-black"
            required
          >
            <option value="">-- Select one --</option>
            <option value="album_id1">Album 1</option>
            <option value="album_id2">Album 2</option>
            <option value="album_id3">Album 3</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-1 font-semibold">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
          {image && <p className="mt-1 text-sm">Selected file: {image.name}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
