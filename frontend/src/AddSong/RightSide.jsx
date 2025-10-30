import Information from "./RightSide/Information";
import Preview from "./RightSide/Preview";
import File from "./RightSide/File";

export default function RightSide({tabName, inputFile, dragAndDropEl, imgUrl,setImgUrl, addSongForm, setAddSongForm}) {
    const tabs = {
        INFORMATION: <Information tabName={tabName} inputFile={inputFile} dragAndDropEl={dragAndDropEl} imgUrl={imgUrl} setImgUrl={setImgUrl} addSongForm={addSongForm} setAddSongForm={setAddSongForm} />,
        FILE: <File addSongForm={addSongForm} setAddSongForm={setAddSongForm}/>,
        PREVIEW: <Preview />
    }
    return (
        <div className="right-side flex-10">
            {tabs[tabName]}
        </div>
    )
}