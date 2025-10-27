import Information from "./RightSide/Information";
import Preview from "./RightSide/Preview";
import File from "./RightSide/File";

export default function RightSide({tabName}) {
    const tabs = {
        INFORMATION: <Information />,
        FILE: <File />,
        PREVIEW: <Preview />
    }
    return (
        <div className="right-side flex-10">
            {tabs[tabName]}
        </div>
    )
}