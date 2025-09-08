const express = require ('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path =require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    credentials: true, // Allow cookies if needed
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const auth = require('./routes/auth');
const tour =require('./routes/tour');
const book = require('./routes/book');
const safari = require('./routes/safari');
const safariBook = require('./routes/safariBook');

app.use('/api/v1/', auth);
app.use('/api/v1/', tour);
app.use('/api/v1/', book);
app.use('/api/v1/', safari);
app.use('/api/v1/', safariBook);


app.use(errorMiddleware);

module.exports = app;