const pgp = require('pg-promise')()
const shortid = require('shortid')

const connectionString = `${process.env.DB_ENDPOINT}/todos`
const db = pgp(connectionString)

/*
table columns: id, category, todo_text, todo_status, created_at, updated_at
POST AND PUT request format:
{
  "category": "goal",
  "todo_text": "fly to mars",
  "todo_status": "FALSE",
  "created_at": "now()",
  "updated_at": null,
  "target_date": "2017-10-10 04:05:06"
}
*/

const getAllData = (req, res, next) => {
  db.any('select * from items')
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: 'Retrieved all data'
        })
    })
    .catch(next)
}

const getItemsList = (req, res, next) => {
  const category = req.params.category
  db.any('select * from items where category=$1', category)
    .then(data => {
      res.status(200)
        .json({
          status: 'Success',
          data: data,
          message: `Retrieved all items for ${category} category`
        })
    })
    .catch(next)
}

const createItem = (req, res, next) => {
  req.body.id = shortid.generate()
  db.none('insert into items(id, category, todo_text, todo_status, created_at, updated_at, target_date)' +
      'values(${id}, ${category}, ${todo_text}, ${todo_status}, ${created_at}, ${updated_at}, to_timestamp(${target_date}))', req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Inserted one item'
        })
    })
    .catch(next)
}

const updateItem = (req, res, next) => {
  const id = req.params.id
  const { category, todo_text, todo_status, target_date } = req.body
  db.none('update items set category=$1, todo_text=$2, todo_status=$3, updated_at=now(), target_date=to_timestamp($4) where id=$5',
    [category, todo_text, todo_status, target_date, id])
    .then(() => {
      res.status(200)
        .json({
          status: 'Success',
          message: 'Updated item'
        })
    })
    .catch(next)
}

const removeItem = (req, res, next) => {
  const id = req.params.id
  db.result('delete from items where id = $1', id)
    .then(result => {
      res.status(200)
        .json({
          status: 'Success',
          message: `Removed ${result.rowCount} item`
        })
    })
    .catch(next)
}

module.exports = {
  getAllData      : getAllData,
  getItemsList    : getItemsList,
  createItem      : createItem,
  updateItem      : updateItem,
  removeItem      : removeItem
}
