const { CronJob } = require('cron')
const messenger = require('./messenger')

const morningMessage = new CronJob(
  '0 13 8 * * 1-5',
  () => messenger('good_morning'),
  () => console.log('stoped'),
  false,
  process.env.TIME_ZONE,
)

morningMessage.start()
