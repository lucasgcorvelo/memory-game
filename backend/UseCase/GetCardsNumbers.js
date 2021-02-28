const CARD_CONFIG = require('config').get('CARD')
const generateRandomNumber = (cardConfig) => {
  return Math.floor(Math.random() * (cardConfig.MAX - cardConfig.MIN + 1)) + cardConfig.MIN
}

const getCards = (numberOfCards) => {
  let cardArray = []
  while (cardArray.length < numberOfCards) {
    const cardNumber = generateRandomNumber(CARD_CONFIG)
    if(!cardArray.includes(cardNumber)) cardArray.push(cardNumber)
  }
  return cardArray
}

module.exports = getCards
