export default function SingIn({ signForm, setSwitchForm, clickedAccount}) {
    return (
        (<>

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
                                    onChange={() => signForm(event)}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form__input "
                                    onChange={() => signForm(event)}
                                />
                                <button
                                    type="submit"
                                    className="form__button "
                                >
                                    Sign In
                                </button>
                                <button
                                    type="button"
                                    onClick={clickedAccount}
                                    className="form__button__cancel "
                                >
                                    Cancel
                                </button>
                                <div className="w-[100%]">
                                    Don't you have account? <a onClick={() => setSwitchForm(true)} className="text-blue-500 cursor-pointer hover:text-amber-500">Register</a>

                                </div>
                            </form>
                        </div >
                    </div>
                </div>
            </div>

        </>)
    )
}