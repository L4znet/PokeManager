<template>
<nav>
<ul>
  <li>
    Trier par types
    <select v-model="filterValue" @change="filterBy({filterValue:filterValue, filterType:'types'})">
      <option v-for="(type, index) in getTypes" :value="type" :key="index">{{type}}</option>
    </select>

  </li>
  <li>
    Trier par rareté
    <select v-model="filterValue" @change="filterBy({filterValue:filterValue, filterType:'rarity'})">
      <option v-for="(rarity, index) in getRarities" :value="rarity" :key="index" :selected="rarity === 'Tous'">{{rarity}}</option>
    </select>
  </li>
  <li>
    Trier par collection
    <select v-model="filterValue" @change="filterBy({filterValue:filterValue, filterType:'set'})">
      <option v-for="(set, index) in getAllSet" :value="set" :key="index">{{set}}</option>
    </select>
  </li>
</ul>
</nav>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Filters',
  methods:{
    ...mapActions("cards", ["filterBy"])
  },
  computed:{
    ...mapGetters("cards", ["getRarities", "getAllCards", "getTypes", "getAllSet"])
  },
  data() {
    return {
      selected:1
    }
  }
}

</script>


<style scoped>

nav{
  display:flex;
  width:100%;
  justify-content: center;
  margin-top:20px;
}

nav ul{
  width:500px;
  display: flex;
  justify-content: space-around;
}
nav ul li{
  list-style:none;
}

nav ul li select{
  width:130px;
  height:30px;
  border-radius: 50px;
  background-color: #e33441;
  color: #FFF;
  border:none;
  outline: none;
  padding-left:20px;
}

nav ul li select::placeholder{
  color: #ffffff;
}
</style>