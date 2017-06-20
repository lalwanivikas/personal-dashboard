const pgp = require('pg-promise')()
const shortid = require('shortid')

const connectionString = `${process.env.DB_ENDPOINT}/users`
const db = pgp(connectionString)

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
