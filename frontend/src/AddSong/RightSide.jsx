import Information from "./RightSide/Information";
import Preview from "./RightSide/Preview";
import File from "./RightSide/File";

export default function RightSide({setImportedSong, tabName, inputFile, dragAndDropEl, imgUrl,setImgUrl, informationForm, setInformationForm}) {
    const tabs = {
        INFORMATION: <Information tabName={tabName} inputFile={inputFile} dragAndDropEl={dragAndDropEl} imgUrl={imgUrl} setImgUrl={setImgUrl} informationForm={informationForm} setInformationForm={setInformationForm} />,
        FILE: <File setImportedSong={setImportedSong}/>,
        PREVIEW: <Preview />
    }
    return (
        <div className="right-side flex-10">
            {tabs[tabName]}
        </div>
    )
}