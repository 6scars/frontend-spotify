import { sql } from './db.js'
let controller;

function signIn(req, res, next) {
    return res.status(202).json({ message: "accomplished" })
}
function signUp(req, res, next) {
    return res.status(202).json({ message: "accomplished" })
}

async function playlists(req, res, next) {
    try {
        const data = await sql`
        SELECT
            ROW_NUMBER() OVER () AS id,
            playlists.id AS playlist_id,
            playlists.name,
            authors.id AS author_id,
            array_agg(songs.id) AS "songsId",
            array_agg(songs."song_Image") AS "songsImages"
        FROM playlists
        INNER JOIN playlists_songs ON playlists.id = playlists_songs.playlist_id
        INNER JOIN songs ON songs.id = playlists_songs.song_id
        INNER JOIN authors_songs ON songs.id = authors_songs.song_id
        INNER JOIN authors ON authors.id = authors_songs.author_id
        WHERE authors.id = 1
        GROUP BY playlists.id, playlists.name, authors.id;

        `;

        console.log(data)
        return res.status(202).json({ message: "accomplished", data: data })
    } catch (err) {
        console.error("❌ Error fetching authors:", err);
    }

}
export default controller = {
    signIn,
    signUp,
    playlists
}