'use strict'
require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const app = express()
const routes = require('./routes/routes.js')



app.listen(PORT,console.log('listening on port 3000'))


routes(app);