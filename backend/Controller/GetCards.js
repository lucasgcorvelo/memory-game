const getCardsNumbers = require('../UseCase/GetCardsNumbers')

const isNumberOfCardsValid = (numberOfCards) => (
  numberOfCards >= 0 &&
    ( numberOfCards === 4 ||
      numberOfCards === 8 ||
      numberOfCards === 12 )
)

const isBodyParamValid = (body) => (
  body.hasOwnProperty('numberOfCards') || typeof body.numberOfCards === 'number'
)

const GetCardsController = (req, res) => {

  if (!isBodyParamValid(req.body))
    res.send('numberOfCards property must be a number')

  if (!isNumberOfCardsValid(req.body.numberOfCards))
    res.send('numberOfCards property must be 4,8 or 12')

  return res.send(getCardsNumbers(req.body.numberOfCards))
}

module.exports = GetCardsController
