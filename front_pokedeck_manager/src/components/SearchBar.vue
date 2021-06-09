<template>
  <section class="searchbar">
   <search-bar-elements></search-bar-elements>

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
  }
}
</script>
