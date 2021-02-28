<template>

<div class="container">

  <button @click="checkHistory()">HISTORY</button>

  <input v-model="numberOfCards" class="type" name="numberOfCards" type="text"
         placeholder="Input a number of cards" />

  <button @click="setGameMatch()">SEE CARDS</button>

  <div v-if="isGameRunning">

    <div v-for="(card, index) in cards" v-bind:key=index>
      <Card :cardNumber=card :showCardNumber=showCardsNumber v-on:cardSelected="checkMovement"></Card>
    </div>

    <button @click="startGame()">PLAY!</button>

  </div>

</div>

</template>

<script>

import axios from 'axios'
import Card from './components/Card'

export default {
  name: 'App',
  components: {
    Card
  },
  data () {
    return {
      isGameRunning: false,
      numberOfCards: '',
      cards: [],
      showCardsNumber: true,
      gameValidationArray: [],
      gameHistory: []
    }
  },
  methods: {
    setGameMatch,
    startGame,
    checkMovement,
    checkHistory
  }
}

function checkMovement (cardSelected) {
  const smallerCard = getSmallerCard(this.gameValidationArray)

  if (smallerCard !== cardSelected) {
    this.isGameRunning = false
    this.showCardsNumber = true
    addGameToHistory(this.gameHistory, false, this.cards)
  } else {
    this.gameValidationArray.splice(
      this.gameValidationArray.indexOf(cardSelected),
      1)
  }

  if (this.gameValidationArray.length === 0) {
    this.isGameRunning = false
    this.showCardsNumber = true
    addGameToHistory(this.gameHistory, true, this.cards)
  }
}

function getSmallerCard (gameValidationArray) {
  return Math.min.apply( Math, gameValidationArray )
}

function addGameToHistory (gameHistory, victory, match) {
  gameHistory.push({
    date: new Date(),
    victory,
    match
  })
}

function checkHistory () {
  console.log(this.gameHistory)
}

async function setGameMatch () {
  try {
    const getCardsResponse = await getCards(this.numberOfCards)

    this.cards = getCardsResponse.data
    this.gameValidationArray = [...this.cards]
    this.isGameRunning = true
    this.numberOfCards = ''

  } catch (err) {
    this.isGameRunning = false
    console.log('error', err)
  }
}

const getCards = (numberOfCards) => {

  const parsedNumberOfCards = Number(numberOfCards)

  if (!parsedNumberOfCards) throw {
    error: 'NUMBER_OF_CARDS_TYPE',
    message: 'The number of cards must be a number '
  }
  return axios({
    method: 'post',
        url: 'http://localhost:8080/getCards',
        data: { numberOfCards: parsedNumberOfCards },
  })
}

function startGame () {
  this.showCardsNumber = false
}

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
