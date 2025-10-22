import {sql} from './db.js'
let controller;

function signIn(req, res, next) {
    return res.status(202).json({ message: "accomplished" })
}
function signUp(req, res, next) {
    return res.status(202).json({ message: "accomplished" })
}

async function getData(req, res, next) {
    console.log('xdd')
    try {
        const data = await sql`
      SELECT * 
      FROM authors 
      INNER JOIN authors_songs 
      ON  authors.id = authors_songs.author_id
      INNER JOIN songs
      ON songs.id = authors_songs.song_id;
      
    `;
        return res.status(202).json({ message: "accomplished", data: data })
    } catch (err) {
        console.error("❌ Error fetching authors:", err);
    }

}
export default controller = {
    signIn,
    signUp,
    getData
}