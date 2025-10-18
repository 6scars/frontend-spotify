import { useState } from 'react'
export default function Sign({setSigning, signForm}) {

    return (
        <>
            <img alt="account" src="https://rgmmwhkixprkskznqjcy.supabase.co/storage/v1/object/public/spotify/images/logos/logoaccount.svg" className="h-[90%] cursor-pointer" onClick={signForm} />

        </>
    )
}