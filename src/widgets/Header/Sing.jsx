
export default function Sign({ isLogedIn, clickedAccount }) {

    return (
        <>
            {isLogedIn ?
                <button className="account-button" onClick={clickedAccount} type="button"><span>K</span> Konto</button>
                :
                <button className="account-button account-button--guest" onClick={clickedAccount} type="button">Zaloguj się</button>


            }


        </>
    )
}
