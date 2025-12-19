import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import nocache from 'nocache'


// import connectDB from './src/config/db.js';
// import sessionMiddleware from './src/config/session.js'

import userRout from './src/routes/userRout.js'
// import adminRout from './src/routes/adminRout.js'

let app = express()

// connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(nocache());

// app.use(sessionMiddleware);

app.use(userRout)
// app.use('/admin',adminRoute)


app.listen(8080, () => {
    console.log('Server running on http://localhost:8080')
})
