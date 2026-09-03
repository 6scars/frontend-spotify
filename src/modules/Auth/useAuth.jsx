import { checkToken, fetchPlaylists, fetchSongs } from "../../scripts/Fetches.jsx";
import { useEffect, useState } from 'react'

export function useAuth() {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([])
    const user_id = Number(localStorage.getItem('user_id'))


    useEffect(() => {
        const fetches = async () => {
            const fetchedSongs = await fetchSongs();
            setSongs(fetchedSongs || []);
        }
        fetches()
    }, [])


    async function fetchAuthState() {
        const valid = await checkToken();
        console.log(valid)
        if (valid) {
            setIsLogedIn(valid)
            setPlaylists(await fetchPlaylists(user_id) || [])
        }

    }





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
