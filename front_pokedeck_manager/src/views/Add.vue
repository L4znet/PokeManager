<template>
  <section class="adddecks">
    <section>
      <searchbar></searchbar>
    </section>
    <section class="selectedDecks">
      <ul>
        <li><i>4</i> Magicarpe <i class="fas fa-times"></i></li>
      </ul>
    </section>
  </section>
</template>

<script>

import Searchbar from '@/components/SearchBar.vue'
export default {
  name: 'Add',
  components: {
    Searchbar
  }
}
</script>

<style>

  .adddecks{
    width:100%;
    display:flex;
  }

  .adddecks section{
    width:100%;
    height:100vh;
  }

  .selectedDecks{
    display: flex;
    flex-direction: column;
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
</style>
