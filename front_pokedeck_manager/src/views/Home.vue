<template>
    <section class="home">
      <searchbar></searchbar>

      <cards :addPage="true"></cards>
    </section>
</template>

<script>
import Searchbar from '@/components/SearchBar.vue'
import Cards from '@/components/Cards.vue'

export default {
  name: 'Home',
  components: {
    Searchbar,
    Cards
  }
}
</script>

<style>
  .home{
    display: flex;
    flex-direction: column;
    width:100%;
  }


</style>
