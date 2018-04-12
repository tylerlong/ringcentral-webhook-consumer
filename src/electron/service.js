import express from 'express'
import detectPort from 'detect-port'

import { startNgrok } from './ngrok'

export const startService = async (webhookUriCallback) => {
  const port = await detectPort(6789)
  startNgrok(port, publicUrl => {
    const webhookUri = `${publicUrl}/webhook`
    webhookUriCallback(webhookUri)
    const app = express()
    app.get('/webhook', async (req, res) => {
      res.send('response from webhook')
    })
    app.listen(port)
  })
}
