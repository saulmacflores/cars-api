const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const db = require('./modelsFolder');

// API 'use' Setup
app.use(bodyParser.json());
app.use(
    cors({
        methods: ['POST', 'PUT', 'GET', 'DELETE'],
        origin: '*',
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'Z-Key',
            'Authorization',
        ],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Routes
app.use('/', require('./routesFolder'));

// Exception Catch
process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\nException origin: ${origin}`
    );
});

// Db Connection
db.mongoose
    .connect(db.uri)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Cannot connect to Database...', error);
        process.exit();
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
