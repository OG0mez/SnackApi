'use strict'
require('dotenv').config();
const {PORT} = process.env;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const p = require('./auth/auth.js')

app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  // parse application/json
  app.use(bodyParser.json())
  app.use(p.passport.initialize())
app.listen(PORT,console.log('listening on port 3000'))

routes(app);