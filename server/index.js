require('dotenv').config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const home = require('./routes/home')
const db = require('./db');
const authentication = require('./routes/authentication')
db.on('error', err => console.error(err));
db.once('open', () => console.log("Connected to the database succesfully"));
// middlewares
app.use(express.json());
app.use(cors());


//routes

app.use('/', home);
app.use('/auth', authentication);




app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});