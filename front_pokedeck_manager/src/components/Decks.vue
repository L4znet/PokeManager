<template>
  <section class="decks" v-if="length !== null && length !== 0">
    <deck v-for="(deck, index) in getDecks.data" :key="index" :id="deck.id" :deck_name="deck.deck_name" :deck_emoji="deck.deck_emoji" :is_complete="deck.is_complete" @click="resetSearch"></deck>
  </section>
  <section class="decks" v-else>
    <h1>Aucun deck de créé pour le moment</h1>
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
    ...mapGetters("cards", ["getDeckCards"]),
  },
  methods:{
    ...mapActions("decks", ["getAllDecks"]),
    ...mapActions("cards", ["resetSearch"]),
  },
  data() {
    return {
      length: null
    }
  },

  /**
   * .length ne fonctionne pas directement sur le tableau, donc on utilise le .watch
   */
  watch: {
    getDecks() {
      this.length = this.getDecks.data.length
    }
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
  justify-content: center;
}

.decks h1{
  height: 500px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #b5b5b5;
  font-size:50px;
}

</style>