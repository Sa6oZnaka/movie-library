# movie-library

# Requirements:
* NodeJS
* NPM
* Mysql

# How to setup:
1. Clone the project `git clone https://github.com/Sa6oZnaka/movie-library`
2. Go to the project folder `cd movie-library`
3. Install React dependencies: `npm install`
4. Start the react app: `npm start`
5. Open another terminal and navigate to the server folder: `cd movie-library/server`
6. Install server dependancies: `npm install`
7. Open `server.js` file and edit the data below `const db = mysql.createConnection({` (Line 11) to match your MySQL credentials
8. Execute `db.sql` and make sure you have the database `movielib`
9. Start the server `npm start`

# How to use
1. Go to http://localhost:3000/register
2. Register and then login to your account
3. You will see a message "You are now logged in!" below the login form<br />
   Note: If you dont's see the message make sure your server is running and is connected to your MySQL database!
5. You can navigate to the home page - http://localhost:3000/ and use the application.
