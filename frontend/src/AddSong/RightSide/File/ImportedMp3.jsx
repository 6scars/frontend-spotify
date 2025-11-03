import { useState, useRef, useEffect } from 'react'
export default function ImportedMp3({ addSongForm }) {
    const audioRef = useRef(null);

    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);
    const [loop, setLoop] = useState(false);



    useEffect(() => {
        const a = audioRef.current;
        const onLoaded = () => {
            setDuration(a.duration || 0);
        };
        const onPlay = () => setPlay(true);
        const onPause = () => setPlay(false);
        const onCurrent = () => setCurrent(a.currentTime);



        a.addEventListener("loadedmetadata", onLoaded);
        a.addEventListener("play", onPlay);
        a.addEventListener("pause", onPause);
        a.addEventListener("timeupdate", onCurrent);



        return () => {
            a.removeEventListener("loadedmetadata", onLoaded);
            a.removeEventListener("play", onPlay);
            a.removeEventListener("pause", onPause);
            a.removeEventListener("timeupdate", onCurrent);
        };
    }, []);


    function handlePlay() {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) {
            setPlay(true);
            a.play();
        } else {
            setPlay(false);
            a.pause();
        }
    }


    function handleLoop() {
        const a = audioRef.current;
        if (!a) return;
        setLoop((prev) => {
            a.loop = !prev;
            return !prev;
        });
    }

    function formatTime(time) {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    function onSeek(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const prc = clickX / rect.width;
        const newTime = prc * duration;

        setCurrent(newTime);
        audioRef.current.currentTime = newTime;
    }

    const progressBar = (current / duration) * 100;
    return (

        <div
            className="play-center-section h-full w-[400px] min-w-[200px] max-w-[600px]
        flex flex-col items-center text-[var(--main-color)]
      "
        >
            <div>{addSongForm.importedSongNameFile}</div>
           {addSongForm.importedSongUrlBlob ? <span>Saved</span> : ''}
            <div className="w-full flex-1 flex justify-center items-center gap-5">
                <button>
                    <img
                        onClick={handleLoop}
                        className="h-[35px]  cursor-pointer"
                        alt="loop-song"
                        src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${loop ? "" : "Crossed"
                            }Song.svg`}
                    />
                </button>
                <button>
                    <img
                        alt="start-music"
                        src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/previousSong.svg"
                        className="w-10 h-full cursor-pointer"
                    />
                </button>
                <button onClick={handlePlay}>
                    <img
                        alt="start-music"
                        src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/${play ? "pause" : "start"
                            }Song.svg`}
                        className="w-10 h-full cursor-pointer"
                    />
                </button>
                <button>
                    <img
                        alt="start-music"
                        src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/nextSong.svg`}
                        className="w-10 h-full cursor-pointer"
                    />
                </button>
                <button>
                    <img
                        onClick={handleLoop}
                        className="h-[35px]  cursor-pointer"
                        alt="loop-song"
                        src={`https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/loop${loop ? "" : "Crossed"
                            }Song.svg`}
                    />
                </button>
            </div>

            <div className="w-full flex-1 flex justify-center items-center">
                <div className="text-red-500 min-w-[50px]">{formatTime(current)}</div>
                <div
                    onClick={(event) => onSeek(event)}
                    className="w-[300px] h-[15px] bg-[var(--help-color2)] rounded-full overflow-hidden"
                >
                    <div
                        style={{ width: `${progressBar}%` }}
                        className="h-full bg-white transition-all duration-300"
                    />
                </div>
                <audio
                    ref={audioRef}
                    src={addSongForm.importedSongUrlBlob}
                    preload="metadata"
                />
                <div className="text-red-500  min-w-[50px]">{formatTime(duration)}</div>

            </div>
        </div>
    );

}