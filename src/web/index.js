import './index.css'

console.log('Hello world')

global.startService(webhookUri => {
  console.log(webhookUri)
})
