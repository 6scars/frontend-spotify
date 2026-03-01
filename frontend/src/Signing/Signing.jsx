import { useState } from 'react'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import AccountOptions from "./AccountOptions/AccountOptions"
import "./Signing.css"
import { useAuthContext } from '../contexts/AuthContext.jsx'
import { useUIStateContext } from '../contexts/UIStateContext.jsx'

export default function Signing() {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const [switchForm, setSwitchForm] = useState(false);

    const { isLogedIn, setIsLogedIn } = useAuthContext();
    const { clickedAccount } = useUIStateContext();
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
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/newAccount`, {
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
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {
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
            console.log(data)
            if(response.ok === false) throw new Error(data.message, response.status)
            
            if (data.token) {
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user_id', data.user_id)
                window.location.reload();
            }

        } catch (err) {
            console.error(err)
        }
    }



    return (
        <>
            {
                isLogedIn ? <AccountOptions
                    setIsLogedIn={setIsLogedIn}
                    clickedAccount={clickedAccount}
                /> :
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