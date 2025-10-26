import jwt from 'jsonwebtoken'
import env from 'dotenv'
import bcrypt from 'bcrypt'
import { sql } from './db.js'
env.config()

let controller;

async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        const data = await sql`
            SELECT id, email, password
            FROM authors
            WHERE authors.email = ${email}
        `;
        const userPassword = data[0].password;
        const userId = data[0].id
        const userEmail = data[0].email

        const isMatch = await bcrypt.compare(password, userPassword);
        if (isMatch) {
            const token = await jwt.sign({
                id: userId,
                email: userEmail
            },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            return res.status(201).json({ message: 'logedIn', token })
        } else {
            throw 'wrong password'
        }

    } catch (err) {
        return res.status(401).json({ message: 'wrongPassword' })
    }
}

async function signUp(req, res, next) {
    const saltRounds = 10;
    const { email, password } = req.body
    try {
        const hashed = await bcrypt.hash(password, saltRounds)

        const newUser = await sql`
            INSERT INTO authors (email,password)
            VALUES (${email}, ${hashed})
            ON CONFLICT (email) DO NOTHING
            RETURNING *
        `;
        console.log(newUser)
        return res.status(201).json({ message: 'User Created' })
    } catch (err) {
        console.error('SINGUP error:', err)
    }
    return res.status(202).json({ message: "accomplished" })
}

async function playlists(req, res, next) {
    try {
        const { id } = req.body
        const data = await sql`
        SELECT 
            authors.id AS author_id,
            authors.author AS author_name,
            authors.email,
            playlists.id AS playlist_id,
            playlists.name AS playlist_name,
            ARRAY_AGG(DISTINCT songs.id) AS song_ids,
            ARRAY_AGG(DISTINCT songs."song_Image") AS song_images
        FROM authors
        INNER JOIN authors_playlists ON authors.id = authors_playlists.author_id
        INNER JOIN playlists ON playlists.id = authors_playlists.playlist_id
        INNER JOIN playlists_songs ON playlists_songs.playlist_id = playlists.id
        INNER JOIN authors_songs ON playlists_songs.song_id = authors_songs.song_id
        LEFT JOIN songs ON authors_songs.song_id = songs.id
        WHERE authors.id = ${id}
        GROUP BY authors.id, authors.author, authors.email, playlists.id, playlists.name;

        `;

        return res.status(202).json({ message: "accomplished", data: data })
    } catch (err) {
        console.error("❌ Error fetching authors:", err);
    }

}

async function fetchSongs(req, res, next) {
    try {
        const data = await sql`
        SELECT 
            author_id, 
            song_id, 
            "song_Name" AS song_name,
            songs."song_Image" AS song_image, 
            author,
            file,
            credit,
            album_id,
            image AS author_image,
            biograph,
            songs.created_at
        FROM songs
        INNER JOIN authors_songs ON authors_songs.song_id = songs.id 
        INNER JOIN authors ON authors.id = authors_songs.author_id
        LIMIT 10
    `
        console.log(data)
        return res.status(201).json({ message: "accompllished", data })

    }catch(err){
        console.error('FETCH SONG FAILURE');
        return res.status(401).json({message:'FETCH SONG FAILURE', error:err})
    }
}

async function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.split(' ')[1];
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
    checkToken,
    fetchSongs
}