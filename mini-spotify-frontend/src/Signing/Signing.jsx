import { useState } from 'react'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import AccountOptions from "./AccountOptions/AccountOptions"
import "./Signing.css"

export default function Signing({ clickedAccount, isLogedIn }) {
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
    const sendForm = async (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        let response;
        try {
            if (switchForm) {
                response = await fetch("http://localhost:3005/api/newAccount", {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        email,
                        password
                    })
                })
            } else {
                response = await fetch("http://localhost:3005/api/signin", {
                    "method": "post",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify({
                        email,
                        password
                    })
                })
            }
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user_id', data.user_id)
                window.location.reload();
            }

        } catch (err) {
            console.error("SEND FORM ERROR: ", err)
        }




    }

    return (
        <>
            {
                isLogedIn ? <AccountOptions clickedAccount={clickedAccount}/> :
                    !switchForm ? (
                        <SignIn
                            signForm={signForm}
                            setSwitchForm={setSwitchForm}
                            clickedAccount={clickedAccount}
                            sendForm={sendForm}
                            isLogedIn={isLogedIn}
                        />) : (<SignUp
                            signForm={signForm}
                            setSwitchForm={setSwitchForm}
                            clickedAccount={clickedAccount}
                            sendForm={sendForm}
                        />)




            }
        </>


    )
}