const { readdirSync } = require('fs')
const {
  reject,
  equals,
  map,
} = require('ramda')

const getFileContent = (fileName) => require(`./${fileName}`)

const filesFromFolder = readdirSync(__dirname)
const files = reject(equals('index.js'), filesFromFolder)
const filesContent = map(getFileContent, files)


module.exports = filesContent
