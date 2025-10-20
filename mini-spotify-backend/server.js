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
const listTables = async () => {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    console.log("✅ Tables in public schema:");
    tables.forEach(t => console.log(t.table_name));
  } catch (err) {
    console.error("❌ Error fetching tables:", err);
  }
};

// call it on startup
listTables();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
