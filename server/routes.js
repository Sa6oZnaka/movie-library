const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");

const saltRound = 10;

module.exports = function (app, db) {

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
        
        db.query("SELECT movieId from users u LEFT JOIN favorites f ON (u.id = ? AND f.userId = ?) WHERE movieId IS NOT NULL;", [userId, userId], (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    });
    
    app.get('/addFavorite', verifyJWT , (req, res) => {  
        const userId = req.userId;
        const movieId = req.headers.movieid;
        db.query("INSERT INTO favorites (userId, movieId) VALUES (?, ?);", [userId, movieId], (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    });

    app.get('/removeFavorite', verifyJWT , (req, res) => {  
        const userId = req.userId;
        const movieId = req.headers.movieid;
        db.query("DELETE From favorites WHERE userId = ? AND movieId = ?;", [userId, movieId], (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    });

    app.get('/removeFavorite', verifyJWT , (req, res) => {  
        const userId = req.userId;
        const movieId = req.headers.movieid;
        db.query("DELETE FROM favorites WHERE userId = ? AND movieId = ?;", [userId, movieId], (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    });

    app.get('/ratings', verifyJWT , (req, res) => {    
        let movieID = req.headers.movieid;
        db.query("SELECT AVG(rating) as rating FROM ratings where movieId = ?;", movieID, (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result[0]);
        });
    })

    app.get('/addRating', verifyJWT , (req, res) => {    
        const userId = req.userId;
        const movieID = req.headers.movieid;
        const rating = req.headers.rating;

        // TODO add primery key to ratings and use:
        //INSERT INTO ratings ((userId, movieId, rating) VALUES (?,?,?) ON DUPLICATE KEY UPDATE rating = ?;
        db.query("INSERT INTO ratings (userId, movieId, rating) VALUES (?, ?, ?)", 
        [userId, movieID, rating], (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result[0]);
        });
    })
    
    app.get('/notes', verifyJWT , (req, res) => {    
        let movieID = req.headers.movieid;
        db.query("SELECT * FROM notes where movieId = ?;", movieID, (err, result) => {
            if(err){
                console.log(err);
            }
            res.send(result);
        });
    })
    
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
                                expiresIn: 30000,
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

}