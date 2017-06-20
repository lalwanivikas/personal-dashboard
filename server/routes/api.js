const express = require('express')
const router = new express.Router()
const todo = require('./../models/todo')

router.get('/items/', todo.getAllData)
router.get('/items/:category', todo.getItemsList)
router.post('/items/', todo.createItem)
router.put('/items/:id', todo.updateItem)
router.delete('/items/:id', todo.removeItem)

module.exports = router
