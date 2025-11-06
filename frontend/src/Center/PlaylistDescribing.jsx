export default function PlaylistDescribing() {
    return (
        <div className="music red-scroll-bar space-y-4 bg-[#232323] flex-[2] h-full min-w-[500px] overflow-y-auto  rounded-md
            relative  flex justify-center items-center playlist-describing"
        >
            <div className="w-[90%] h-[95%] bg-red-500">
                <div className="playlist-name-container flex justify-center items-center">
                    name of the playlists
                </div>

                <div className="playlist-controlls flex justify-center items-center">
                    control swap, play
                </div>



                <div className="song-description-container flex justify-center items-center">
                    image
                    <div className="song-information-container ">
                        <span> name of song</span>
                        <span> username</span>
                    </div>
                    <div className="song-controll-container">
                        <button>just play one song button</button>
                    </div>
                </div>


                <div className="song-description-container flex justify-center items-center">
                    image
                    <div className="song-information-container ">
                        <span> name of song</span>
                        <span> username</span>
                    </div>
                    <div className="song-controll-container">
                        <button>just play one song button</button>
                    </div>
                </div>


                <div className="song-description-container flex justify-center items-center">
                    image
                    <div className="song-information-container ">
                        <span> name of song</span>
                        <span> username</span>
                    </div>
                    <div className="song-controll-container">
                        <button>just play one song button</button>
                    </div>
                </div>

            </div>

        </div>

    )
}