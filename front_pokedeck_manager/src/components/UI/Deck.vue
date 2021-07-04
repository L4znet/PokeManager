<template>

  <router-link :to="'/deck/'+id" class="deck_link">
    <article class="deck">
      <div class="is_locked" v-if="is_complete === 1">
        <i class="fas fa-lock"></i>
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
    deck_emoji:String,
    is_complete:Number

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
  position: relative;
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

.deck .is_locked{
  width:100%;
  height:100%;
  background-color: rgba(255, 255, 255, 0.87);
  position: absolute;
  font-size:60px;
  color: #e33441;
  display: flex;
  justify-content: center;
  align-items: center;
}



</style>