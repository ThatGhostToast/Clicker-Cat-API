// Application Dependencies
const { UserDAO } = require('./lib/app/database/UserDAO.js')
const cors = require('cors');

const bodyParser = require('body-parser');

// Create instance of an Express Application on Port 3000
const express = require('express');
const { User } = require('./lib/app/models/Users.js');
const http = require('http');
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// Database configuration
const dbHost = "clicker-cat.clkzoscxfp7p.us-west-1.rds.amazonaws.com"
const dbPort = 3306;
const dbUsername = "admin"
const dbPassword = "password"

// Set location of static resources and use the JSON body parser
app.use(express.static('app/images'))

const server = http.createServer((req, res) => {
    console.log('got request');

    setTimeout(() => {
        res.end('Hello World!');
    }, 20000)
});

server.timeout = 20000;

// =-=-=-= Route code begins =-=-=-=
/**
 * Get route at Root '/' that returns a Test Text message
 * @param _req User request
 * @param res Function response
 */
app.get('/', function (_req, res)
{
    // Log the location
    console.log('In GET / Route');
    // Return Test Text
    res.send('This is the default root Route.');
})

app.get('/testroute', function (_req, res)
{
    console.log('Okay this works');
    res.send('The testing route works');
})

/** 
 * GET Route at '/users' that returns all users from the database
 * @param _req User request
 * @param res Function response
 */
app.get('/users', function (_req, res)
{
    // Return User List as JSON, call SicknassDAO.findUsers(), and return JSON array of Users (a string)
    // Log the location
    console.log('In GET /users Route');
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUsers function, return all of the users
    dao.findUsers(function(user)
    {
        res.json(user); // Responding with a JSON of all users
    });
})

/** 
 * GET Route that does a wildcard search for all users searching by id from the database
 * @param req User request
 * @param res Function response
 */
app.get('/users/search/user/:id', function (req, res)
{
    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters
    console.log('In GET /users/searach/user Route for ' + req.params.id);
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserById function and using the ID sent in as a parameter to find a user in the database
    dao.findUserById(req.params.id, function(user)
    {
        if (user == null)
        {
            res.status(200).json({error: "INVALID USER ID"}); // If no user was returned by the DAO then the ID was invalid
        } else {
            res.status(200).json(user); // If a user was returned by the DAO, put the user in the response
        }
    });
})

/** 
 * GET Route that does a wildcard search for all users searching by email from the database
 * @param req User request
 * @param res Function response
 */
app.get('/users/search/user/email/:email', function (req, res)
{
    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters 
    console.log('In GET /users/searach/user/email Route for ' + req.params.email);
    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserByEmail function and using the email sent in as a parameter to find a user in the database
    dao.findUserByEmail(req.params.email, function(user)
    {
        if (user == null)
        {
            res.status(200).json({error: "USER NOT FOUND"}); //If the user was not returned by the DAO, then the user was not found
        } else {
            res.status(200).json(user); //If the user was returned by the DAO, put the user into the response
        }
    });
})

/** 
 * POST Route at '/user' that adds a user to the database
 * @param req User request
 * @param res Function response
 */
app.post('/users', function (req, res)
{
    //Adding CryptoJS for encrypting the passwords
    const CryptoJS = require('crypto-js');
    
    // If invalid POST Body then return 400 response else add User to the database
    console.log('In POST /users Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid POST Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid User Posted"});
    }
    else
    {
        //Hashing the user's password before placing it into the database
        const hash = CryptoJS.SHA256(req.body.password);

        // New User model
        let user = new User(req.body.id, req.body.email, hash.toString(), req.body.name);

        // Call userDAO.create() to create a User from Posted Data and return an OK response     
        let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.create(user, function(userId)
        {
            if(userId == -1)
                res.status(200).json({"error" : "Creating User failed"}) //If the response is -1 then something went wrong and the user was not created
            else
                res.status(200).json({"success" : "Creating User passed with an ID of " + userId}); //If the response was anything other than -1 the user was created
        });     
      }
})

/** 
 * POST Route that does a wildcard search for all users searching by email from the database
 * @param req User request
 * @param res Function response
 */
app.post('/users/login', function (req, res)
{
    //Adding CryptoJS for encrypting the passwords
    const CryptoJS = require('crypto-js');

    // Return users List as JSON, call UserDAO.findUserById(), and return JSON array of Users
    // Log the location and the request parameters 
    console.log('In POST /users/login Route');

    //Hashing the user's password to test it against the one saved in the database
    const hash = CryptoJS.SHA256(req.body.password);

    // Create a new instance of the DAO
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    // Using the findUserByEmail function and using the Email sent in as a parameter to find a user in the database
    dao.findUserByEmail(req.body.email, function(user){
        if (user == null)
        {
            res.status(201).json({error: "USER NOT FOUND"}); //If the user was not returned by the DAO, then the user was not found
        } else {
            if (user.password == hash) //Testing if the password matches the password of the user found in the database
            {
                console.log("USER FOUND");
                res.status(200).json(user); //If the user was returned by the DAO and the password was correct, put the user into the response
            } else {
                res.status(202).json({error: "INCORRECT PASSWORD"}); // If this error is thrown then the user was found but the password was incorrect
            }
        }
    });
})

/** 
 * DELETE Route at '/user/:id' that deletes users at a given user ID from the database
 * @param req User request
 * @param res Function response
 */
app.delete('/users/:id', function (req, res)
{
    // Get the user
    console.log('In DELETE /users Route with ID of ' + req.params.id);
    let userId = Number(req.params.id);
 
    // Call UserDAO.delete() to delete a user from the database and return if passed
    let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
    dao.delete(userId, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete User failed"}) //If zero changes were made to the database then the user was not deleted
        else
            res.status(200).json({"success" : "Delete User passed"}) //If changes were made to the database then the user was deleted
    });
 })

/** 
 * PUT Route at '/user' that updates a user in the database
 * @param req User request
 * @param res Function response
 */
app.put('/users', function (req, res)
{
    //Logging the request body
    console.log(req.body);
    // If invalid PUT Body then return 400 response else update user in the database
    console.log('In PUT /users Route with Post of ' + JSON.stringify(req.body));
    if(!req.body)
    {
        // Check for valid PUT Body, note this should validate EVERY field of the POST
        res.status(400).json({error: "Invalid user Posted"});
    }
    else
    {
        // New User model from Posted Data
        let user = new User(req.body.id, req.body.email, req.body.password, req.body.name);

        // Call UserDAO.update() to update a user from Posted Data and return an OK response     
        let dao = new UserDAO(dbHost, dbPort, dbUsername, dbPassword);
        dao.update(user, function(changes)
        {
            if(changes == 0)
                res.status(200).json({error : "Updating User passed but nothing was changed"}) //If there are no changes made to the database, then it will return this status
            else
                res.status(200).json({success : "Updating User passed and data was changed"}); //If there are changes made to the database, then it will return this status
        });     
      }
})

// =-=-=-= Route code ends =-=-=-=
/**
 * Start the Server
 * @param port The port where the API will sit and listen for a request
 */
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}!`);
});
