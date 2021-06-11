<template>
  <section class="adddecks">
    <section>
      <searchbar></searchbar>
      <cards :addPage="true"></cards>
    </section>
    <section class="selectedDecks">
       <emojiselector></emojiselector>
      <input type="text" v-model="deckName" @keyup="changeDeckName(deckName)" placeholder="Choisissez un nom pour votre deck">
      <ul>
        <li><i>4</i> Weedle <i class="fas fa-times"></i></li>
      </ul>
    </section>
  </section>
</template>

<script>

import Searchbar from '@/components/SearchBar.vue'
import Cards from '@/components/Cards.vue'
import emojiselector from '@/components/Emoji_selector.vue'
import {mapActions} from "vuex";
export default {
  name: 'Add',
  components: {
    Searchbar,Cards,emojiselector
  },
  methods:{
    ...mapActions("decks", ["changeDeckName"])
  },
}
</script>

<style>

  .adddecks{
    width:100%;
    display:flex;
  }

  .adddecks section{
    width:100%;
  }

  .selectedDecks{
    display: flex;
    flex-direction: column;
    align-items: center;
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

  .selectedDecks input{
    margin-top:20px;
  }

</style>
