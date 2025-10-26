export default function LeftSide() {
    return (
        <div className="left-side flex-3 text-[var(--help-color)]  ">
            <div className="left-tab information-tab  h-[25%]
                        
                        ">
                <span>INFORMATION</span>
            </div>
            <div className="left-tab file-tab w-full h-[25%] ">
                <span>FILE</span>
            </div>
            <div className="left-tab preview-tab w-full h-[50%] ">
                <span>PRIEVIEW</span>
            </div>
        </div>
    )
}