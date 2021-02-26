const appConfig = require('config')
const express = require('express')
const app = express()
const cardService = require('./Service/CardService')
const errorHandler = require('./Middleware/ErrorHandler')
const PORT = appConfig.get('PORT')

app.use(express.json())
app.post('/getCards', cardService.getCards)

app.get('/test', (req, res) => {
  console.log('testing')
  res.send('it is working friend')
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is listening on port::${PORT}`)
})
