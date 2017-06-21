const pgp = require('pg-promise')()
const connectionString = `${process.env.DB_ENDPOINT}/todos`
const db = pgp(connectionString)

module.exports = {
  db
}
