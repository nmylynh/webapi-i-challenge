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
// db.find() returns a promise that resolves to a list of existing users  
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


//post to users

server.post('/api/users', (req, res) => {
    // one way a client can send information is in the request body
    // axios.post(url, payload) << the payload will show up as req.body on the server
        const user = req.body;
        if(!user.name || !user.bio) {
            return res
            .status(400)
            .json({
                error: "Please provide name and bio for the user."
            })
        }
        db
            .add({ user })
            .then(newUser => { 
                //user added successfully
                 res
                 .status(201)
                 .json(newUser); //this is the payload
            })
            .catch(err => {
            // we ran into an error getting the users
            // use the catch-all 500 status code
                res
                .status(500)
                .json({
                    error: "There was an error while saving the user to the database" 
                });
            });
    });


// delete user

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
      .remove(id)
      .then(deleted => {
          //the data layer returns the deleted record
          //we'll use it to check if the id provided is valid
        if (deleted) {
            //.end() ends the request and sends the response with the specified status code
            //204 is commonly used for delete as there is no need to send anything back
            res.status(204).end();
        } else {
            res.status(404).json({
                error: "The user with the specified ID does not exist." 
            });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The user could not be removed."
        });
      });
  });

//update user

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    if(!user.name || !user.bio) {
        return res
        .status(400)
        .json({
            error: "Please provide name and bio for the user."
        })
    }

    db.update(id, changes)
      .then(updated => {
          if (updated) {
              res.status(200).json({
                  updated
              })
          } else {
              res.status(404).json({
                  error:"The user with the specified ID does not exist."
              });
          }
      })
      .catch(err => {
          res.status(500).json({
            error: "The user information could not be modified." 
          });
      });
});