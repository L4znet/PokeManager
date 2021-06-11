<template>
<div class="emoji_selector">
  <div class="emoji_picker" @click="loadEmojiList">+<span></span></div>

  <transition name="fade" mode="out-in">
    <div class="emoji_picker_list" v-if="getListEmojiState">
      <ul>
        <li v-for="(emoji, index) in emojiList" :key="index" @click="selectEmoji(emoji.codes)" >{{emoji.char}}</li>
        <button @click.prevent="refreshEmojiList">Changer la liste</button>
      </ul>
    </div>
  </transition>
</div>
</template>

<script>


import {mapActions, mapGetters} from "vuex";
import emoji from 'emoji.json';

export default {
  name: 'Emoji_Selector',
  components: {
  },
  data(){
    return{
      emojiList:[]
    }
  },
  computed:{
    ...mapGetters("decks", ["getListEmojiState"]),
  },
  methods: {
    ...mapActions("decks", ["selectEmoji"]),
    ...mapActions({
      toggleListEmoji: 'decks/toggleListEmoji',
      selectEmoji: 'decks/selectEmoji'
    }),

    loadEmojiList(){
      this.toggleListEmoji()
      this.refreshEmojiList()
    },
    refreshEmojiList(){
      this.emojiList = []


      for (let i = 0; i < 55; i++) {
        this.emojiList.push(emoji[Math.round(Math.random() * (400 - 1) + 1)]);
      }

      console.log(this.emojiList)
    }
  },
}
</script>


<style scoped>

.emoji_selector{
  display: flex;
  width:100%;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top:20px;
}

.emoji_selector .emoji_picker{
  border:2px solid #e33441;
  width:60px;
  height:60px;
  border-radius: 50%;
  background-color: #FFF;
  margin:85px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px 5px 8px 5px;
  position: absolute;
  z-index:9996;
  left:0;
  font-size:40px;
}

.emoji_selector .emoji_picker:hover span{
  opacity: 0.5;
  cursor: pointer;
}

.emoji_selector .emoji_picker span{
  z-index:9997;
  width:60px;
  height:60px;
  border-radius: 50%;
  background-color: #f53636;
  margin-top:3px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px 5px 8px 5px;
  position: absolute;
  left:0;
  opacity: 0;
}

.emoji_selector .emoji_picker_list{
  width:910px;
  height:700px;
  background-color: #FFF;
  position: absolute;
  z-index:9999;
  top:0;
  right:50px;
  border-radius:40px;
}

.emoji_selector .emoji_picker_list ul{
  display: flex;
  flex-wrap:wrap;
  flex-direction: row;
  width:100%;
  justify-content: space-between;
}

.emoji_selector .emoji_picker_list ul li{
  width:80px;
  height:80px;
  background-color: #ffffff;
  border-radius: 50%;
  margin:10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:30px;
}

.emoji_selector .emoji_picker_list ul li:hover{
  background-color: #ececec;
  cursor: pointer;
}

.emoji_selector .emoji_picker_list button{
  width:100%;
  height:70px;
  background-color: #FFF;
  border:none;
  font-size:20px;
  position: absolute;
  bottom:0;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  color:#f53636;
  border-top:1px solid #e5e5e5;
}

.emoji_selector .emoji_picker_list button:hover{
  background-color: #f53636;
  cursor: pointer;
  color:#FFF;
}

</style>
