import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nocache from 'nocache'
import dotenv from 'dotenv'

import connectDB from './src/config/db.js';
import sessionMiddleware from './src/config/session.js'

import userRout from './src/routes/userRout.js'
import adminRout from './src/routes/adminRout.js'


const PORT = process.env.PORT || 8080;

let app = express();
connectDB();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(nocache());

app.use(sessionMiddleware);

app.use(userRout)
app.use(adminRout)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
