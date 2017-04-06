const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./queries')

const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/items/', db.getAllData)
app.get('/api/items/:category', db.getItemsList)
app.post('/api/items/', db.createItem)
app.put('/api/items/:id', db.updateItem)
app.delete('/api/items/:id', db.removeItem)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    })
  })
}

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
