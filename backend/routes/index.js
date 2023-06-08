// Create an index.js file in the routes folder. In this file,
// create an Express router, create a test route, and export the router
// at the bottom of the file.
// backend/routes/index.js
const express = require('express');
const router = express.Router();

const apiRouter = require('./api'); // is this in the right spot?
router.use('/api', apiRouter);

// In this test route, you are setting a cookie on the response with the name
// of XSRF-TOKEN to the value of the req.csrfToken method's return. Then, you
// are sending the text, Hello World! as the response's body.
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// }); // comment this out because I passed the test

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;
