import { checkToken, fetchPlaylists } from "../scripts/Fetches.jsx";
import { useState } from 'react'
export function useAuth() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const user_id = Number(localStorage.getItem('user_id'))

    async function fetchAuthState() {
        const valid = await checkToken();
        if (valid) {
            setIsLogedIn(valid)
            setPlaylists(await fetchPlaylists(user_id) || [])
        }

    }
    return {
        isLogedIn,
        setIsLogedIn,
        playlists,
        setPlaylists,
        fetchAuthState
    }
}