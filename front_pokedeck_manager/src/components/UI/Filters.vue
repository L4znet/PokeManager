<template>
<nav>
<ul>
  <li>
    <select v-model="filterValue" @change="filterBy(filterValue)">
      <option selected disabled>
        Types
      </option>
    </select>

  </li>
  <li>
    <select v-model="filterValue" @change="filterBy({cards:getCards, filterValue:filterValue})">
      <option selected disabled>
        Rareté
      </option>
      <option value="57">
        VALEUR DE TEST
      </option>
      <option v-for="(rarity, index) in getRarities" :value="rarity" :key="index">{{rarity}}</option>
    </select>
  </li>
  <li>

    <select v-model="filterValue" @change="filterBy(filterValue)">
      <option selected disabled>
        Collection
      </option>
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
    ...mapGetters("cards", ["getRarities", "getCards"])
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
  color:#FFF;
  border:none;
  outline: none;
  padding-left:20px;
}
</style>