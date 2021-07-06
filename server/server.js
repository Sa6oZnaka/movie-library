const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRound = 10;

const jwt = require('jsonwebtoken');

const app = express();

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
            express: 60 * 60 * 24,
        }
    })
);
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "movielib"
})

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash) => {
        if(err){
            console.log(err);
        }
        db.query("INSERT INTO users (username, password) VALUES (?, ?);", [username, hash], (err, result) => {
            console.log(err);
        });
    })
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(! token){
        res.send("Missing token!");
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err){
                res.send({auth: false, message: "Auth FAILED!"});
            }else{
                // save token for next requests
                req.userId = decoded.id;
                next();
            }
        })
    }

}

app.get('/isUserAuth', verifyJWT , (req, res) => {
    res.send("Authenicated!");
})

app.get('/favorites', verifyJWT , (req, res) => {    
    const userId = req.userId;
    
    db.query("SELECT movieId from users u LEFT JOIN favorites f ON (u.id = ? AND f.userId = ?);", [userId, userId], (err, result) => {
        if(err){
            console.log(err);
        }
        res.send(result);
    });
});

/*app.get('/ratings', verifyJWT , (req, res) => {    
    
    const movieID = req.body.movieId;
    //console.log(movieID);
    //console.log(req.body);
    console.log(req.body);
    console.log(req);
    console.log(movieID);

    //db.query("SELECT AVG(rating) FROM ratings where movieId = ?;", movieID, (err, result) => {
    //});
})*/

app.get("/login", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user});
    }else{
        res.send({loggedIn: false});
    }
})

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?;",
        username,
        (err, result) => {
            if(err){
                res.send({err:err});
            }

            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        req.session.user = result;
                        
                        const id = result[0].id;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        })

                        req.session.user = result;
                        res.json({
                            auth: true, 
                            token: token, 
                            result: result
                        });
                    } else {
                        res.json({auth: false, message: "Wrong username/password!"});
                    }
                })
            }else{
                res.json({auth: false, message: "User doesn't exist!"})
            }
        }
    )
});


app.listen(3001, () => {
    console.log("Server started!");
})