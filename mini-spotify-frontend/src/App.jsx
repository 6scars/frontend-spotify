import { useState } from "react";

import Header from "./Header/Header.jsx";
import Aside from "./Aside/Aside.jsx";
import Center from "./Center/Center.jsx";
import Play from "./Play/Play.jsx";
import "./App.css";

import songs from "../public/data/songs.json";
import authors from "../public/data/authors.json";

export default function MiniSpotify() {
  const [song, setSong] = useState(null);
  const [author, setAuthor] = useState(null);
  const [show, setShow] = useState(false);
  const [latest, setLatest] = useState(JSON.parse(localStorage.getItem('latest')) || []);
  const [signing, setSigning] = useState(false)

  const signForm = () => {
    signing ? setSigning(false) : setSigning(true)
  }

  return (
    <>

      <Header setSigning={setSigning} signForm={signForm} />

      <Center
        song={song}
        author={author}
        songs={songs}
        authors={authors}
        setSong={setSong}
        setAuthor={setAuthor}
        show={show}
        setShow={setShow}
        latest={latest}
        setLatest={setLatest}
      />
      {song ? <Play song={song} author={author} /> : ""}
      <Aside show={show} songs={songs} />
      {signing && (
        <>

          <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-[9999]">

          </div>
          <div className="flex w-[100%] h-[100%]"> 
          <div className="fixed left-[50%] top-[50%] bg-white rounded-2xl shadow-lg p-8 w-[500px]  z-[99999]">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={signForm}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                Cancel
              </button>
            </form>
          </div>
          </div>

        </>
      )}

    </>
  );
}
