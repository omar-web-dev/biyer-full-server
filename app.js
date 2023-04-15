const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 8080;

/**
 * @description add default middleware for express application.
 */
app.use(express.json());
app.use(cors());

const { errorHandler } = require('./middleware/errorHandler');
const { connectToServer } = require('./database/database.config');


connectToServer((error) => {
    if (!error) {
        app.listen(port, () => {
            console.log(`server is running port ${port}`);
        })
    } else {
        console.log(error);
    }
})

app.get('/', (req, res) => {
    res.json('server is running');
});


app.get('*', (req, res) => {
    res.status(400).send({ status: 'failed', message: 'there was no any route found.' })
});

app.use(errorHandler)

process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message);
    app.close(() => { process.exit(1) })
});