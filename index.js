require('dotenv').config()
require('./schedules')

const routes = require('./routes')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(7000, () => {
  console.log('Example app listening on port 7000!')
})
