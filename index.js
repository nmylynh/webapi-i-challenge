// set a port for the server
const port = "4000"; 
// import the db (data manager file)
const db = require("./data/db");
// npm module, needs to be installed, equivalent to import express from 'express';
const express = require("express");
// creates an http web server
const server = express(); 
// makes the web server listen for incoming traffic on port 4000
server.listen(4000, () => {
    //this callback function runs after the server starts successfully
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
});

//get all users
server.get('/api/users', (req, res) => {
// db.find() returns a promise that resolves to a list of existing hubs  
    db.find()
        .then(users => { 
             res
             .status(200)
             .json(users);
        })
        .catch(err => {
        // we ran into an error getting the users
        // use the catch-all 500 status code
            res
            .status(500)
            .json({
                error: "The users information could not be retrieved." 
            });
        });
});


