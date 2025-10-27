export async function fetchSongs() {
    const response = await fetch('http://localhost:3005/api/fetchSongs');
    const data = await response.json();
    return data.data
}

export async function fetchPlaylists(id) {
    if(!id){
        return []
    }
    try {
        const playlistsResponse = await fetch('http://localhost:3005/api/playlists', {
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
        const dataUserResponse = await fetch('http://localhost:3005/api/checkToken', {
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


export async function addView(id){
    fetch(`http://localhost:3005/api/${id}/addView`);
    return 
}

