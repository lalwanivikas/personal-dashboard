const shortid = require('shortid')
const bcrypt = require('bcrypt')

const db = require('./../start').db;

const createUser = (credentials) => {
  const { name, email, password } = credentials
  const salt = bcrypt.genSaltSync()
  const password_hash = bcrypt.hashSync(password.trim(), salt)
  const userData = {
    user_id: shortid.generate(),
    name: name.trim(),
    email: email.trim(),
    password_hash: password_hash
  }

  return new Promise((resolve, reject) => {
    db.none('insert into users (user_id, name, email, password_hash) values (${user_id}, ${name}, ${email}, ${password_hash})', userData)
    .then((data) => {
      // console.log(data)
      resolve({
        status: 'Success',
        message: 'Account created'
      })
    })
    .catch(reject)
  })
}

module.exports = {
  createUser
}

/*
table columns: user_id, name, email, password_hash, password_salt
POST AND PUT request format:
{
  "user_id": "3Q856BS", // auto generated
  "name": "Vikas",
  "email": "lalwani.vikas20@gmail.com",
  "password_hash": "????",
  "password_salt": "????"
}
*/
