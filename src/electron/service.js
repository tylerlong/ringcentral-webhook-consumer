import express from 'express'
import detectPort from 'detect-port'
import bodyParser from 'body-parser'

import { startNgrok } from './ngrok'

export const startService = async (webhookUriCallback) => {
  const port = await detectPort(6789)
  startNgrok(port, publicUrl => {
    const webhookUri = `${publicUrl}/webhook`
    webhookUriCallback(webhookUri)
    const app = express()
    app.use(bodyParser.json())
    app.get('/webhook', async (req, res) => {
      console.log('WebHook calls me!')
      res.send('response from webhook')
    })
    app.post('/webhook', async (req, res) => {
      console.log(req)
      res.header('validation-token', req.header('validation-token'))
      res.send('response from webhook')
    })
    app.listen(port)
  })
}
