const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware');
const cors = require("cors");


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(auth);
app.use(routes);

mongoose.connect(`mongodb://127.0.0.1:27017/plant-nook`)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB Error,', err.message));


app.listen(3000, console.log(`Server is listening on port 3000...`));