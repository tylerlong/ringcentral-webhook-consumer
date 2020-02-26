global.startService(webhookUri => {
  console.log('WebHook URI is', webhookUri)
  document.getElementsByTagName('h1')[0].innerText = webhookUri
})
