require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://lalwanivikas.auth0.com/.well-known/jwks.json"
  }),
  audience: 'ToDoList API',
  issuer: "https://lalwanivikas.auth0.com/",
  algorithms: ['RS256']
})

app.use(jwtCheck)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/items/', db.getAllData)
app.get('/api/items/:category', db.getItemsList)
app.post('/api/items/', db.createItem)
app.put('/api/items/:id', db.updateItem)
app.delete('/api/items/:id', db.removeItem)


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
