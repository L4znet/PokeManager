<template>
  <article class="card" :class="{ card__add_page: addPage, highlight_card:cardSelected, lock_card:cardLocked, }">
    <div class="card_quantity" v-if="quantity > 1">{{quantity}}</div>
    <div class="card_quantity" v-if="quantity > 1">{{quantity}}</div>
    <img :src="picture">
  </article>

</template>



<script>

export default {
  name: 'Card',
  props:{
    picture:String,
    quantity:Number,
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
    position: relative;
  }

  .card .card_quantity{
    width:30px;
    height:30px;
    border-radius:50%;
    background-color: #e33441;
    position: absolute;
    top:-10px;
    left:-10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#FFF;
    font-size:13px;
    font-weight: bold;
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
