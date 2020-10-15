const express = require("express");
const budgetRouter = require('../budget-router');

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use(budgetRouter);


server.use((er, req, res, next) => {
    console.log(er);
    res.status(500).json({message: 'server side error'})
})
module.exports = server;
