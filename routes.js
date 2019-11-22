const express = require('express')
const messenger = require('./messenger')

const router = express.Router()

router.post('/', (req, res) => {
  const tag = req.body.text

  if (req.body.text) {
    messenger(tag)
    res.send('Claro meu querido..')
  } else {
    res.send('O que foi? Não entendi meu querido')
  }
})

module.exports = router
