import express from 'express';
import { json } from 'body-parser';
import { connect } from 'mongoose';
import cors from './middlewares/cors';
import logger from './middlewares/logger';
import usersRouter from './routes/users';
import booksRouter from './routes/books';

require('dotenv').config();

const app = express();

const {
    PORT,
    API_URL,
    DB_URL
} = process.env;

connect(DB_URL, err => {
    if (err) throw err;
    console.log('Connected to database success');
})

app.use(cors);
app.use(logger);
app.use(json());
app.use(usersRouter);
app.use(booksRouter);
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, () => {
    console.log(`Server start on ${API_URL}:${PORT}`)
});