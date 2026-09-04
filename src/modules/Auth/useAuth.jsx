import { checkToken, fetchPlaylists, fetchSongs } from "../../scripts/Fetches.jsx";
import { useCallback, useEffect, useState } from 'react'

export function useAuth() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([])
    useEffect(() => {
        const fetches = async () => {
            const fetchedSongs = await fetchSongs();
            setSongs(fetchedSongs || []);
        }
        fetches()
    }, [])


    const fetchAuthState = useCallback(async () => {
        const valid = await checkToken();
        console.log(valid)
        if (valid) {
            setIsLogedIn(valid)
            const userId = Number(localStorage.getItem('user_id'))
            setPlaylists(await fetchPlaylists(userId) || [])
        }
    }, [])





    return {
        isLogedIn,
        playlists,
        songs,

        setIsLogedIn,
        setPlaylists,
        fetchAuthState,
        setSongs,

    }
}
