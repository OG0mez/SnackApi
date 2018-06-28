'use strict'
require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('passport');

app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  // parse application/json
  app.use(bodyParser.json())
  
app.listen(PORT,console.log('listening on port 3000'))

routes(app);