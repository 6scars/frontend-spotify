import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'
import { sql } from './db.js'
env.config()

let controller;

function signIn(req, res, next) {
    
    return res.status(202).json({ message: "accomplished" })
}
async function signUp(req, res, next) {
    const saltRounds = 10;
    const {email, password} = req.body
    try{
        const hashed = await bcrypt.hash(password, saltRounds)
        
        const newUser = await sql`
            INSERT INTO authors (email,password)
            VALUES (${email}, ${hashed})
            ON CONFLICT (email) DO NOTHING
            RETURNING *
        `;
        console.log(newUser)
        return res.status(201).json({message: 'User Created'})
    }catch(err){
        console.error('SINGUP error:',err)
    }
    return res.status(202).json({ message: "accomplished" })
}

async function playlists(req, res, next) {
    try {
        const { id } = req.body
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
        WHERE authors.id = ${id}
        GROUP BY playlists.id, playlists.name, authors.id;

        `;

        // console.log(data)
        return res.status(202).json({ message: "accomplished", data: data })
    } catch (err) {
        console.error("❌ Error fetching authors:", err);
    }

}

async function checkIsLogedIn(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            return res.status(201).json({ message: "accomplished", token: token })
        } else {
            return res.status(401).json({ message: 'NOT VALID TOKEN' })
        }
    } catch (err) {
        console.error('NOT VALID TOKEN')
        return res.status(401).json({ message: 'NOT VALID TOKEN' })
    }
}


export default controller = {
    signIn,
    signUp,
    playlists,
    checkIsLogedIn
}