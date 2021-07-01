<template>
  <div>
    <section class="addecks">
      <section>
        <section class="side">
          <searchbar :isDeckDetail="true"></searchbar>
          <cardsselected></cardsselected>
        </section>
        <section class="side"  v-if="deckCardsLength !== 0">

          <router-link :to="'/add/'+id" class="edit_deck">
            Modifier ce deck
          </router-link>
          <ul class="addedCard" v-for="(deckCard, index) in getDeckCards.data" :key="index">
            <li><b>x{{ deckCard.card_quantity }}</b><span>{{ deckCard.card_name }}</span></li>
          </ul>
        </section>
        <section class="side" v-else>

          <router-link :to="'/add/'+id" class="edit_deck">
            Ajouter des cartes
          </router-link>
          <h1>Ce deck est tristement vide :(</h1>
        </section>
      </section>
    </section>
  </div>
</template>

<script>

import Searchbar from '@/components/SearchBar.vue'
import cardsselected from '@/components/Cards_Selected.vue'
import {mapActions, mapGetters} from "vuex";
import router from '../router';

export default {
  name: 'Deck',
  data() {
    return {
      cardAdded:true,
      id:router.currentRoute._value.params.id,
      deckCardsLength: null
    }
  },

  /**
   * .length ne fonctionne pas directement sur le tableau, donc on utilise le .watch
   */
  watch: {
    getDeckCardsLength() {
      this.deckCardsLength = this.getDeckCards.data.length
    },

  },
  components: {
    Searchbar,cardsselected
  },
  mounted() {
    this.loadCardsToDeck()
  },


  computed:{
    ...mapGetters("decks", ["getEditDeckState", "getDecks"]),
    ...mapGetters("cards", ["getDeckCards"]),
  },
  methods:{
    ...mapActions("cards", ["loadCardsToDeck"])
  },
}
</script>

<style>

.addecks{
  width:100%;
  display:flex;
}

.addecks section{
  width:100%;
  display: flex;
}

.addecks section .side{
  width:100%;
  height:100vh;
  display: flex;
  flex-direction: column;
}

.addecks section .side h1{
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #c8c8c8;
  font-size:30px;
  text-align: center;
}

.addecks section .side .addedCard{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.addecks section .side .addedCard li b{
  margin-left:30px;
}

.addecks section .side .addedCard li span{
  width:100%;
  display: flex;
  justify-content: center;
}

.addecks section .side .addedCard li{
  content:'';
  width:90%;
  height:80px;
  background-color: #FFF;
  list-style: none;
  border-radius:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color:#000;
}

.addecks section .side .addedCard li:hover:before{
  opacity: 0;
  cursor: default;
}


.addecks section .side .addedCard .loading{
  cursor: not-allowed;
}

.addecks section .side .addedCard .loading:before{
  content:'';
  width:100%;
  height:80px;
  background-color: #d6d6d6;
  list-style: none;
  border-radius:20px;
  position: absolute;
  transition:all 0.3s;
  cursor: not-allowed;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  text-transform: uppercase;
  font-weight: bold;
  color:#FFF;
}

.addecks section .side .addedCard .loading:hover:before{
  content:'';
  width:100%;
  height:80px;
  background-color: #d6d6d6;
  list-style: none;
  border-radius:20px;
  position: absolute;
  transition:all 0.3s;
  cursor: not-allowed;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  text-transform: uppercase;
  font-weight: bold;
  color:#FFF;

}

.addecks section .side .addedCard .decremente:hover:before{
  content:'Réduire la quantité';
  width:100%;
  height:80px;
  background-color: #7aa459;
  list-style: none;
  border-radius:20px;
  position: absolute;
  transition:all 0.3s;
  cursor: pointer;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  text-transform: uppercase;
  font-weight: bold;
  color:#FFF;
}

.addecks section .side .addedCard .delete:hover:before{
  content:'Supprimer cette carte';
  width:100%;
  height:80px;
  background-color: #ff2d2d;
  list-style: none;
  border-radius:20px;
  position: absolute;
  transition:all 0.3s;
  cursor: pointer;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  text-transform: uppercase;
  font-weight: bold;
  color:#FFF;
}

.addecks section .side p{
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:55px;
  text-align: center;
  color: #c6c6c6;
}

.edit_deck{
  width:200px;
  min-height:50px;
  background-color: #e33441;
  border-radius:40px;
  margin-top:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#FFF;
  text-decoration:none;
  font-size:17px;
}
.edit_deck:hover{
  background-color: #ec555f;
}




</style>
