import express from 'express'
import cors from 'cors'


const app = express();

const PORT = 3005;

app.use(express.json());
app.use(cors());
app.post('/api/newAccount', (req, res) => {
    res.status(201).json({
        message: "accomplished"
    })
})
app.post('/api/signin', (req, res) => {
    res.status(201).json({
        message: "accomplished"
    })
})
app.get('/', (req, res) => {
    res.send("hello");
})

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})