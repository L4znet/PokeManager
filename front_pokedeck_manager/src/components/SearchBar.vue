<template>
  <section class="searchbar">
    <search-bar-elements :isDeckDetail="isDeckDetail"></search-bar-elements>

    <filters></filters>
  </section>
</template>

<script>
import Filters from "./UI/Filters";
import SearchBarElements from "./UI/SearchBarElements";

export default {
  name: 'SearchBar',
  components: {
    Filters,
    SearchBarElements
  },
  props: {
    isDeckDetail: Boolean,
  },
}
</script>

<style>
.searchbar{
  display: flex;
  flex-direction: column;
}
</style>
