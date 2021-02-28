<template>
<p v-show="isToShowCardNumber">{{this.cardNumber}}</p>
<p v-show="!isToShowCardNumber" @click="turnCard()">BLANK</p>
</template>

<script>

export default {
  name: 'Card',
  props: {
    cardNumber: Number,
    showCardNumber: Boolean
  },
  methods: {
    turnCard
  },
  data () {
    return {
      isToShowCardNumber: this.showCardNumber
    }
  },
  watch: {
    showCardNumber () {
      this.isToShowCardNumber = this.showCardNumber
    }
  },
  emits: ['cardSelected']
}

function turnCard () {
  this.isToShowCardNumber = true
  this.$emit('cardSelected', this.cardNumber)
}

</script>
