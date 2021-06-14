<template>
  <section class="addecks">
    <section v-if="getEditDeckState">
      <section class="side">
        <searchbar></searchbar>
        <cards :addPage="true"></cards>
      </section>
      <section class="side">
        <ul class="addedCard" v-if="cardAdded">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p v-else>Pas de carte ajoutée au deck pour le moment...</p>
      </section>
    </section>
    <section class="selectedDecks" v-else>
      <div class="addNewDeck">
        <input type="text" v-model="deckName" @change="changeDeckName(deckName)" placeholder="Choisissez un nom pour votre nouveau deck">
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

export default {
  name: 'Add',
  data() {
    return {
      cardAdded:true
    }
  },
  components: {
    Searchbar,Cards,emojiselector
  },
  mounted() {
    this.switchToEdit()
  },
  computed:{
    ...mapGetters("decks", ["getEditDeckState"])
  },
  methods:{
    ...mapActions("decks", ["changeDeckName", "switchToEdit"])
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
