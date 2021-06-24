<template>
  <article class="card" :class="{ card__add_page: addPage, highlight_card:cardSelected, lock_card:cardLocked }">
    <img :src="picture">
  </article>
</template>

<script>

export default {
  name: 'Card',
  props:{
    picture:String,
    addPage:Boolean,
    cardSelected:Boolean,
    cardLocked:Boolean
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card{
    width:200px;
    height:270px;
    background-color: #e33441;
    margin:0 10px 40px 10px;
    border-radius:10px;
    cursor: pointer;
  }


  .card__add_page:hover img{
    opacity: 0.5;
    transition: 0.3s;
  }

  .card img{
    width:100%;
    height:100%;
    transition: 0.3s;
  }

  .highlight_card img{
    opacity: 0.5;
  }

  .lock_card{
    background-color: #ffffff;
    cursor: not-allowed;
  }

  .lock_card img{
    opacity: 0.2;
  }

  .lock_card:hover img{
    opacity: 0.2;
    transition: 0.3s;
  }
</style>
