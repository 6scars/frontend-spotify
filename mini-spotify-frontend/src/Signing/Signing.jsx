import {useState} from 'react'
import "./Signing.css"

export default function Signing({ signForm }) {
    const [xd, setXd] = useState({
        email:'',
        password:''
    })

    

    return (
        (
            <>

                <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-[20]" />
                <div className="flex w-[100%] h-[100%]">
                    <div className="fixed left-0 top-0 right-0 bottom-0  bg-transparent rounded-2xl shadow-lg p-8 w-full  z-[25]
                        flex justify-center items-center
                    ">
                        <div className="Sign-container w-[50%] h-[50%] bg-[var(--background-color)] rounded-xl
                            text-white
                        ">
                            <div className="Sign_in_text_wrapper h-[20%]">
                                <h3 className="sign_in  ">Sign In</h3>
                            </div>

                            <div className="devider" />
                            <div className="Sign-form-Wrapper w-[100%] h-[79%] align-middle flex justify-center items-center">
                                <form className="flex flex-col gap-5">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form__input "
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form__input "
                                    />
                                    <button
                                        type="submit"
                                        className="form__button "
                                    >
                                        Sign In
                                    </button>
                                    <button
                                        type="button"
                                        onClick={signForm}
                                        className="form__button__cancel "
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div >

                        </div>

                    </div>
                </div>

            </>
        )
    )
}