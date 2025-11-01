import Information from "./RightSide/Information";
import Preview from "./RightSide/Preview";
import File from "./RightSide/File";

export default function RightSide({albumsInfo, tabName, addSongForm, setAddSongForm}) {
    const tabs = {
        INFORMATION: <Information albumsInfo={albumsInfo} tabName={tabName} addSongForm={addSongForm} setAddSongForm={setAddSongForm} />,
        FILE: <File addSongForm={addSongForm} setAddSongForm={setAddSongForm}/>,
        PREVIEW: <Preview addSongForm={addSongForm} />
    }
    return (
        <div className="right-side flex-10">
            {tabs[tabName]}
        </div>
    )
}