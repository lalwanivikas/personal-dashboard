const express = require('express')
const bodyParser = require('body-parser');

const db = require('./queries')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/puppies', db.getAllPuppies)
app.get('/api/puppies/:id', db.getSinglePuppy)
app.post('/api/puppies', db.createPuppy)
app.put('/api/puppies/:id', db.updatePuppy)
app.delete('/api/puppies/:id', db.removePuppy)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});

app.listen(3000, () => console.log("listening on port 3000!"));
