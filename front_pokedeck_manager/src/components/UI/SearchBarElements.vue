<template>
  <form action="">
    <input type="search" v-model="searchTerm" @input="searchValue({searchTerm:searchTerm, cards:getCards})" placeholder="Recherchez une carte...">
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'SearchBarElements',
  data(){
    return{
      searchTerm:''
    }
  },
  methods:{
    ...mapActions("cards", ["searchValue"])
  },
  computed: {
    ...mapGetters("cards", ["getCards"])
  },
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
  display: flex;
  width:100%;
  justify-content: center;
  margin-top:20px;
}

input{
  width:500px;
  height:50px;
  border-radius:50px;
  border:2px solid #e33441;
  outline: none;
  padding-left:20px;
  font-size:20px;
  font-weight:300;
}

button{
  background-color: #e33441;
  color:#FFF;
  border:none;
  width:50px;
  border-radius: 50%;
  margin-left:20px;
  outline: none;
}

button:hover{
  background-color: #fa4753;
  cursor: pointer;
}

</style>
