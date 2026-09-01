

export async function fetchSongs() {
    console.log(import.meta.env.VITE_BACKEND_URL)
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fetchSongs`);
    const data = await response.json();
    return data.data
}

export async function fetchPlaylists(id) {
    if (!id) {
        return []
    }
    try {
        const playlistsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                { id }
            )


        });
        const data = await playlistsResponse.json();
        const d = data.data
        return d

    } catch (error) {
        console.error('Error fetching dataPlaylists:', error);
    }
};

export async function checkToken() {
    try {
        const dataUserResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkToken`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await dataUserResponse.json();
        if (data.token) {
            return true
        }
        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id')
        return false
    } catch (error) {
        console.error('Error fetching  dataUser:', error);
        return false
    }

};


export async function addView(id) {
    console.log('addView function called...')
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/addView`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
            song_id: id
        })
    }).catch((err) => console.error('addView ERROR', err))
}