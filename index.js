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




