const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const db = require('./../start').db
const bcrypt = require('bcryptjs')

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const providedData = {
    email: email.trim(),
    password: password.trim()
  }
  db.one('select * from users where email = $1', providedData.email)
    .then(user => {
      if (!user) { return done(null, false) }
      if (!comparePass(providedData.password, user.password_hash)) {
        return done(null, false)
      }
      const payload = {
        sub: user.user_id
      }
      // create a token string
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      const data = {
        name: user.name
      }
      return done(null, token, data)
    })
    .catch(done)
})

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}

// select from users where email = 'lalwani.vikas20@gmail.com'
