import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.route';
require('dotenv').config();

// Initializations
const app = express()

// Configurations
app.set('port', process.env.PORT || 4000)


// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send(`API is at http://localhost:${app.get('port')}`)
})

app.use(authRoutes);

export default app