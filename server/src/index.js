const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware');
const cors = require("cors");

mongoose.connect(`mongodb://127.0.0.1:27017/plant-nook`)
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB Error,', err.message));

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());
app.use(auth);
app.use(routes);


app.get("/", (req, res) => {
    res.json("Hello!");
});

app.set('port', (process.env.PORT || 3000));
app.use('/',express.static(__dirname));
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:'+ app.get('port')+'/');
});
// app.listen(3000, console.log(`Server is listening on port 3000...`));