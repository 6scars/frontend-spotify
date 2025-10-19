import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import "./Signing.css"

export default function Signing({ clickedAccount }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const [switchForm, setSwitchForm] = useState(false);

    const signForm = (e) => {
        setFormValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <>
            {
                !switchForm ? <SignIn signForm={signForm} setSwitchForm={setSwitchForm} clickedAccount={clickedAccount} /> : <SignUp signForm={signForm} setSwitchForm={setSwitchForm} clickedAccount={clickedAccount} />
            }
        </>


    )
}