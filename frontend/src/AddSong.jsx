import "./AddSong.css";
import LeftSide from "./AddSong/LeftSide.jsx"
import RightSide from "./AddSong/RightSide.jsx"
export default function AddSong() {
    return (
        <>
            <div className="flex items-center justify-center w-full h-full ">
                <div className="w-[90vw] h-[75vh] bg-[var(--background-color)]
                    rounded-3xl overflow-hidden flex 
                ">
                    <LeftSide />
                    <RightSide />

                </div>
            </div>

        </>
    )
}