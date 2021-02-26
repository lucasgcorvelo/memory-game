const CARD_CONFIG = require('config').get('CARD')
const generateRandomNumber = (cardConfig) => {
  return Math.floor(Math.random() * (cardConfig.MAX - cardConfig.MIN + 1)) + cardConfig.MIN
}

const getCards = (numberOfCards) => (
  [...Array(numberOfCards)]
    .map( () => {
      return generateRandomNumber(CARD_CONFIG)
    })
)

module.exports = getCards
