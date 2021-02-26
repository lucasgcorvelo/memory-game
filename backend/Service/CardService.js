const GetCardsController = require('../Controller/GetCards')

const getCards = (req, res, next) => {
  return GetCardsController(req, res, next)
}

module.exports = {
  getCards
}
