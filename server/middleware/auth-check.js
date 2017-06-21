const jwt = require('jsonwebtoken')
const db = require('./../start').db

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end() }

    const userId = decoded.sub

    // check if a user exists
    db.one('select * from users where user_id = $1', userId)
      .then(() => {
        req.body.user_id = userId
        next()
      })
      .catch(() => res.status(401).end())
  })

}
