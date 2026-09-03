import { useNavigate } from 'react-router';
import './AccountOptions.css'
export default function AccountOptions({ clickedAccount }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-[20]" />
            <div className="flex w-[100%] h-[100%]">
                <div className="fixed left-0 top-0 right-0 bottom-0  bg-transparent rounded-2xl shadow-lg p-8 w-full  z-[25]
                        flex justify-center items-center
                    ">
                    <div className="Sign-container w-[50%] h-[50%] bg-[var(--background-color)] rounded-xl
                            text-white
                        ">
                        <div className="Sign_in_text_container h-[20%]">
                            <div className="h-full flex-1 text-[2rem]gap-[10px]
                            "></div>
                            <h3 className="sign_in  h-full flex-10">Account</h3>
                            <div onClick={() => clickedAccount(false)} className="cancel-button-wrapper cursor-pointer hover:bg-[var(--help-color2)] h-full flex-1 text-[2rem]
                                flex justify-center items-center gap-[10px]
                            ">X</div>



                        </div>

                        <div className="devider" />
                        <div className="account-options">
                            <a>Your account</a>
                            <a onClick={()=>{navigate('/addSong')}}>Add song</a>
                            <a>Personalize account</a>
                            <a>Settings</a>
                            <button className="cursor-pointer" onClick={() => {
                                localStorage.removeItem('user_id', null);
                                localStorage.removeItem('jwt', null);
                                window.location.reload();
                            }}>Logout</button>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )

}
