import {useState} from 'react'

export function useCurrentVariables() {
    /*currentSong keeps data about playling right now a song, shows Play Component*/
    const [currentSong, setCurrentSong] = useState(null);
    /*currentPlaylist keeps data about songs in the playlists, allows to play it in Play Component*/
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    /*currentPlaylistI saves current iteration/position in the currentPlaylist*/
    const [currentPlaylistI, setCurrentPlaylistI] = useState(null);
    return {
        currentSong, setCurrentSong,
        currentPlaylist, setCurrentPlaylist,
        currentPlaylistI, setCurrentPlaylistI
    }
}
