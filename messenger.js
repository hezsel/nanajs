const { IncomingWebhook } = require('@slack/webhook');
const {
  always,
  isNil,
  cond,
  not,
  T,
  length,
  pipe,
  filter,
  prop,
  includes,
} = require('ramda')
const url = process.env.SLACK_WEBHOOK_URL;
const messagesFiles = require('./data')

const webhook = new IncomingWebhook(url);

const bodyBuilder = ({ text, img_url }) => cond([
  [(url) => not(isNil(url)), always({
    blocks: [
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": text,
          "emoji": true
        },
        "image_url": img_url,
        "alt_text": text
      }
    ],
  })],
  [T, always({
    "text": text,
  })],
])(img_url)

const sendMessage = async (message) => {
  const body = bodyBuilder(message)

  await webhook.send(body)
}

const getRandomPositionOfList = (list) => Math.floor(Math.random() * length(list))

const chooseMessage = (files) => {
   const randomFileIndex = getRandomPositionOfList(files)
   const randomMessageIndex = getRandomPositionOfList(files[randomFileIndex].items)

   return files[randomFileIndex].items[randomMessageIndex]
}

const filterFilesByTag = (tag) => filter(
  pipe(prop('tags'), includes(tag)),
  messagesFiles,
)

const sendRandomMessageFromTag = pipe(filterFilesByTag, chooseMessage, sendMessage)


module.exports = sendRandomMessageFromTag
