// backend/app.js
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Create a variable called isProduction that will be true if the environment
// is in production or not by checking the environment key in the configuration file
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize the Express application:
const app = express();

// Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

// Add the cookie-parser middleware for parsing cookies and the express.json middleware
// for parsing JSON bodies of requests with Content-Type of "application/json":
app.use(cookieParser());
app.use(express.json());


// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  const routes = require('./routes'); // is this in the right spot?
  app.use(routes); // Connect all the routes

  module.exports = app;
