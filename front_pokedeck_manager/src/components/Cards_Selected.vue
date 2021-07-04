<template>
  <transition name="slide-fade">


    <section class="cards" v-if="!getSearchState">
      <pagination></pagination>
      <card v-for="(card, index) in getDeckCards" :key="index" :picture="card.card_picture" :quantity="card.card_quantity"></card>
      <pagination></pagination>
    </section>
    <section class="cards" v-else>
      <h2>{{ getSearchResults.length }} résultats pour votre recherche</h2>
      <card v-for="(card, index) in getSearchResults" :key="index" :picture="card.card_picture"></card>
    </section>
  </transition>

</template>

<script>

import Card from '@/components/Card.vue'
import Pagination from './UI/Pagination.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'Cards_Selected',
  components: {
    Card,Pagination
  },
  data(){
    return{
      cards:{},
    }
  },
  props:{
    addPage:Boolean
  },
  mounted() {
    this.loadCards()
  },
  computed: {
    ...mapGetters("cards", ["getDeckCards", "getSearchResults", "getSearchState"]),
    ...mapState("cards", ["pendingRequest"]),
  },
  methods: {
    ...mapActions("cards", ["loadCards", "addToDeck"]),
  },
}
</script>


<style scoped>
.cards{
  width:100%;
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  flex-wrap:wrap;
}

.cards h2{
  width:100%;
  display: flex;
  justify-content: center;
  font-size:30px;
}


</style>
