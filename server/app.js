require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport');

// route handlers
const apiRoutes = require('./routes/api')
const authRoutes = require('./routes/auth')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize());

app.use('/api', apiRoutes) // api routes
app.use('/auth', authRoutes) // authentication route


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
