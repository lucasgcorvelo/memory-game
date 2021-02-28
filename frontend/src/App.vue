<template>

<div class="container">
  <input v-model="numberOfCards" class="type" name="numberOfCards" type="text"
         placeholder="Input a number of cards" />

  <button @click="setGameMatch()">SEE CARDS</button>

  <div v-if="isGameRunning">

    <div v-for="(card, index) in cards" v-bind:key=index>
      <Card :cardNumber=card :showCardNumber=showCardsNumber v-on:cardSelected="checkCardSelected"></Card>
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
      cards: null,
      showCardsNumber: true,
      gameValidationArray: null
    }
  },
  methods: {
    setGameMatch,
    startGame,
    checkCardSelected
  }
}

function checkCardSelected (cardSelected) {
  const smallerCard = getSmallerCard(this.gameValidationArray)
  console.log(smallerCard)
  if (smallerCard !== cardSelected) {
    this.isGameRunning = false
    this.showCardsNumber = true
  } else {
    this.gameValidationArray.splice(this.gameValidationArray.indexOf(cardSelected), 1)
    console.log('array', this.gameValidationArray)
  }
}

function getSmallerCard (gameValidationArray) {
  return Math.min.apply( Math, gameValidationArray )
}


async function setGameMatch () {
      try {
        const getCardsResponse = await getCards(this.numberOfCards)

        this.cards = getCardsResponse.data
        this.gameValidationArray = [...this.cards]
        this.isGameRunning = true

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
