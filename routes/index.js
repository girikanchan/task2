const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const bodyParser = require("body-parser"); 
router.use(bodyParser.json());
router.use('/users', usersRouter);

module.exports = router;
