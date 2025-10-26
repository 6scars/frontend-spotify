
export default function Sign({ isLogedIn, clickedAccount }) {

    return (
        <>
            {isLogedIn ?
                <button alt="account" className="flex items-center h-[90%] cursor-pointer" onClick={clickedAccount}> ACCOUNT</button>
                :
                <button alt="account" className="flex items-center h-[90%] cursor-pointer" onClick={clickedAccount}> SIGN UP</button>


            }


        </>
    )
}