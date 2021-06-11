<template>
<div class="emoji_selector">
  <div class="emoji_picker">🐬<span></span></div>
  <input type="text" v-model="searchTerm" @input="searchValue({searchTerm:searchTerm, cards:getCards})" placeholder="Choisissez un nom pour votre deck">

  <transition name="fade" mode="out-in">
    <div class="emoji_picker_list">
      <ul>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
        <li>fsdfsd</li>
      </ul>
    </div>
  </transition>
</div>
</template>

<script>


export default {
  name: 'Emoji_Selector',
  components: {
  },
  data(){
    return{
      cards:{}
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
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
  margin:20px 20px 0 0;
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
  top:20px;
  border-radius:40px;
  display: none;
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
}

.emoji_selector .emoji_picker_list ul li:hover{
  background-color: #ececec;
  cursor: pointer;
}

</style>
