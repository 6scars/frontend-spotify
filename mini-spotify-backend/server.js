import express from 'express'
import cors from 'cors'
import router from './router.js'


const app = express();

const PORT = 3005;

app.use(express.json());
app.use(cors());
app.use("/api",router)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})