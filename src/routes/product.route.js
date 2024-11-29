const express = require('express')
const app = express.Router()

const controller = require('../controllers/product.controller')

//localhost:4000/products
app.get('/', controller.get)

//localhost:4000/products
app.get('/:id', controller.getById)

app.post('/', controller.create)


module.exports = app