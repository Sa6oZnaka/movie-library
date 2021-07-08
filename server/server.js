const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "movielib"
})

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
    session({
        key: "userId",
        secret: "Secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            express: 60 * 60 * 24 * 10000,
        }
    })
);

require('./routes')(app, db);

app.listen(3001, () => {
    console.log("Server started!");
})