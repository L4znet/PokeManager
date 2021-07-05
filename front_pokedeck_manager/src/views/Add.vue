<template>
  <section class="addecks">
    <section v-if="getModes.addingMode">
      <section class="side">
        <searchbar></searchbar>
        <cards :addPage="true"></cards>
      </section>
      <section class="side" v-if="length !== 0">
        <router-link :to="'/deck/'+id" class="edit_deck">
          Retourner au deck
        </router-link>
        <div class="editDeck">
          <input type="text" v-model="getCurrentDeckInfo.deck_name" @change="changeAndReset(getCurrentDeckInfo.deck_name)" placeholder="Choisissez un nom pour votre nouveau deck">
          <emojiselector :emojiCode="getCurrentDeckInfo.deck_emoji"></emojiselector>

        </div>

        <ul class="addedCard" v-for="(deckCard, index) in getDeckCards" :key="index">
          <li class="decremente" v-if="deckCard.card_quantity > 1" @click="deleteCardFromDeck(deckCard.id)"><b>x{{ deckCard.card_quantity }}</b><span>{{ deckCard.card_name }}</span></li>
          <li class="delete" v-else-if="deckCard.card_quantity === 1" @click="deleteCardFromDeck(deckCard.id)"><b>x{{ deckCard.card_quantity }}</b><span>{{ deckCard.card_name }}</span></li>
        </ul>

      </section>
      <section class="side" v-else>
       <h1>Vous n'avez sélectionné aucune carte pour le moment</h1>
      </section>
    </section>
    <section class="selectedDecks" v-else>
      <div class="addNewDeck">


        <input type="text" v-model="deckName" @change="addDeckName(deckName)" placeholder="Choisissez un nom pour votre nouveau deck">

        <emojiselector></emojiselector>
      </div>

    </section>
  </section>
</template>

<script>

import Searchbar from '@/components/SearchBar.vue'
import Cards from '@/components/Cards.vue'
import emojiselector from '@/components/Emoji_selector.vue'
import {mapActions, mapGetters} from "vuex";
import router from "../router";

export default {
  name: 'Add',
  data() {
    return {
      cardAdded:true,
      id:router.currentRoute._value.params.id,
      length: null,
      deckName:''
    }
  },

  /**
   * .length ne fonctionne pas directement sur le tableau, donc on utilise le .watch
   */
  watch: {
    getDecks() {
      this.length = this.getDecks.data.length
    },
    resetDeckName(){
      this.deckName = ""
    }
  },
  components: {
    Searchbar,Cards,emojiselector
  },
  mounted() {
    this.switchToEdit()
  },

  computed:{
    ...mapGetters("decks", ["getModes", "getDecks"]),
    ...mapGetters("cards", ["getSelectedCards", "getDeckCards", "getCurrentDeckInfo"]),
  },
  methods:{
    ...mapActions("decks", ["addDeckName", "switchToEdit"]),
    ...mapActions("cards", ["loadSelectedCard", "deleteCardFromDeck"]),

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

  .addecks section .side .addedCard li{
    width:90%;
    height:80px;
    background-color: #FFF;
    list-style: none;
    margin-top:40px;
    border-radius:20px;
    position: relative;
    transition:all 0.3s;
    font-size:30px;
  }

  .addecks section .side .addedCard li{
    content:'Supprimer cette carte';
    width:90%;
    height:80px;
    background-color: #FFF;
    list-style: none;
    margin-top:40px;
    border-radius:20px;
    position: relative;
    transition:all 0.3s;
    cursor: pointer;
    display: flex;
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

  .addecks section .side .addedCard li:hover:before{
    content:'Supprimer cette carte';
    width:100%;
    height:80px;
    background-color: #ff2d2d;
    list-style: none;
    border-radius:20px;
    position: absolute;
    transition:all 0.3s;
    cursor: pointer;
    opacity: 0.5;
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

  .selectedDecks{
    display: flex;
    flex-direction: column;
    width:100%;

  }

  .selectedDecks ul{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .selectedDecks ul li{
    width:80%;
    height:60px;
    border-radius:18px;
    background-color:#FFF;
    list-style: none;
    margin:20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size:20px;
  }

  .selectedDecks ul li i{
    width:40px;
    height:40px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size:20px;
  }

  .selectedDecks ul li i:first-child{
    background-color: #e33441;
    color:#FFF;
    margin-left:10px;
    font-style:normal;
  }

  .selectedDecks ul li i:last-child{
    font-size:30px;
    margin-right:10px;
    color: #000;
  }
  .selectedDecks ul li i:last-child:hover{
    color: #e33441;
    cursor: pointer;
  }
  input{
    width:730px;
    height:45px;
    border-radius:50px;
    border:2px solid #e33441;
    outline: none;
    padding-left:20px;
    font-size:20px;
    font-weight:300;
    margin-top:20px;
  }


  .selectedDecks .addNewDeck{
    display: flex;
    width:100%;
    justify-content: center;
  }


</style>
