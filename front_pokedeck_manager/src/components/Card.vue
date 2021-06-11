<template>
  <article class="card">
    <img :src="picture" alt="">
  </article>
</template>

<script>
export default {
  name: 'Card',
  props:{
    picture:String
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
  }

  .card:hover img{
    opacity: 0.5;
    cursor: pointer;
    transition: 0.3s;
  }

  .card img{
    width:100%;
    height:100%;
    transition: 0.3s;
  }
</style>
