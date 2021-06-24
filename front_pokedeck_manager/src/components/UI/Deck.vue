<template>

  <router-link :to="'/deck/'+id" class="deck_link">
    <article class="deck">
      <div v-if="getDeckCompleteState">
        fdsfsdfsd
      </div>
      <div class="emoji">
        {{String.fromCodePoint('0x' + deck_emoji)}}
      </div>
      <div class="name">  {{deck_name}}</div>
    </article>
  </router-link>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'Deck',
  props:{
    id:Number,
    deck_name:String,
    deck_emoji:String

  },
  computed:{
    ...mapGetters('cards', ['getDeckCompleteState'])
  }
}
</script>

<style>

.deck_link{
  text-decoration: none;
}

.deck {
  width: 180px;
  height: 200px;
  background-color: #FFF;
  margin:0 0 50px 70px;
  position: relative;
  transition:all 0.3s;
  cursor: pointer;
}

.deck:hover{
  transform: rotate(-10deg);
}

.deck .name{
  width:100%;
  height:50px;
  background-color: #e33441;
  color:#FFF;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.deck .emoji{
  width:100%;
  height:100%;
  font-size:70px;
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>