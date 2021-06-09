<template>
  <transition name="slide-fade">
    <section class="cards" v-if="!getSearchState">
      <card v-for="(card, index) in getCards" :key="index" :name="card.name" :hp="card.hp" :picture="card.images.small" :type_1="card.types[0]" :type_2="card.types[1]"></card>
      <div class="pagination">
        <button :disabled="pendingRequest" @click="loadCards(getPendingRequestState)" :class ="(pendingRequest)?'load_button_disabled':'load_button'">En charger plus</button>
      </div>
    </section>
    <section class="cards" v-else>
      <h2>{{ getSearchResults.length }} résultats pour votre recherche</h2>
      <card v-for="(card, index) in getSearchResults" :key="index" :name="card.name" :hp="card.hp" :picture="card.images.small" :type_1="card.types[0]" :type_2="card.types[1]"></card>
    </section>
  </transition>

</template>

<script>

import Card from '@/components/Card.vue'
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'Cards',
  components: {
    Card
  },
  data(){
    return{
      cards:{}
    }
  },
  mounted() {
    this.loadCards()
  },
  computed: {
    ...mapGetters("cards", ["getCards", "getSearchResults", "getSearchState", "getCardsLoadedCount", "getCardsLoadedState"]),
    ...mapState("cards", ["pendingRequest"]),
  },
  methods: {
    ...mapActions("cards", ["loadCards"]),
  },
}
</script>


<style scoped>
.cards{
  width:100%;
  display: flex;
  justify-content: space-evenly;
  align-content: space-around;
  margin-top:30px;
  flex-wrap:wrap;
}

.cards h2{
  width:100%;
  display: flex;
  justify-content: center;
  font-size:30px;
}

.pagination{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination button{
  width:300px;
  height:50px;
  border-radius: 50px;
  border:none;
  margin-top:30px;
  font-size:17px;
}

.pagination .load_button{
  background-color: #e33441;
  color:#FFF;
}

.pagination .load_button:hover{
  background-color: #fa4753;
  cursor: pointer;
}

.pagination .load_button_disabled{
  background-color: #a0a0a0;
  color: #000000;
  cursor: not-allowed;
}

</style>
