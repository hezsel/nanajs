const { readdirSync } = require('fs')
const {
  reject,
  includes,
  __,
  map,
} = require('ramda')

const getFileContent = (fileName) => require(`./${fileName}`)

const filesFromFolder = readdirSync(__dirname)
const files = reject(includes(__, ['index.js', 'example.js']), filesFromFolder)
const filesContent = map(getFileContent, files)


module.exports = filesContent
