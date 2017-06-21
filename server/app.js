require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());


// load passport strategies
const localLoginStrategy = require('./passport/local-login');
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// route handlers
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
app.use('/auth', authRoutes) // authentication route
app.use('/api', apiRoutes) // api routes


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  })
})

app.listen(3000, () => console.log("listening on port 3000!"))
