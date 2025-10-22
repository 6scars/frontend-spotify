import express from 'express';
import cors from 'cors';
import router from './router.js';
import env from 'dotenv';
import postgres from 'postgres';
env.config();

const DATABASE_KEY = process.env.DATABASE_KEY;

// create a SQL client
const sql = postgres(DATABASE_KEY, { ssl: { rejectUnauthorized: false } });

const app = express();
const PORT = process.env.PORT || 3005;
app.use(express.json());
app.use(cors());
app.use("/api", router);

// list only tables in the "public" schema
const getAllAuthors = async () => {
  try {
    const authors = await sql`
      SELECT * 
      FROM authors 
      INNER JOIN authors_songs 
      ON  authors.id = authors_songs.author_id
      INNER JOIN songs
      ON songs.id = authors_songs.song_id;
      
    `;
    console.log(authors);
  } catch (err) {
    console.error("❌ Error fetching authors:", err);
  }
};

// Usage
await getAllAuthors();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
