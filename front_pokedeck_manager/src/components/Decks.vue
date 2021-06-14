<template>
  <section class="decks">
    <deck v-for="(deck, index) in getDecks.data" :key="index" :id="deck.id" :deck_name="deck.deck_name" :deck_emoji="deck.deck_emoji"></deck>
  </section>
</template>

<script>
import deck from './UI/Deck'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MyDecks',
  components: {
    deck
  },
  computed:{
    ...mapGetters("decks", ["getDecks"]),
  },
  methods:{
    ...mapActions("decks", ["getAllDecks"])
  },
  mounted() {
    this.getAllDecks()
  }
}
</script>

<style>
.decks{
  margin-top:50px;
  display: flex;
  flex-wrap: wrap;
  width:100%;
  justify-content: center
}

</style>