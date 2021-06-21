<template>
   <section class="pagination">
     <button @click.prevent="decrementPageNumber()" :class="[getPaginationButtonLockedState.left.locked ? locked : notLocked]"><i class="fas fa-chevron-left"></i></button>
     <button @click.prevent="incrementPageNumber()" :class="[getPaginationButtonLockedState.right.locked ? locked : notLocked]"><i class="fas fa-chevron-right"></i></button>
   </section>
</template>

<script>


import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Pagination',
  data() {
    return {
      notLocked: 'pagination_unlocked',
      locked: 'pagination_locked',
    }
  },
  computed: {
    ...mapGetters("cards", ["getPaginationButtonLockedState"]),
  },
  methods: {
    ...mapActions("cards", ["incrementPageNumber", "decrementPageNumber"]),
  },
}
</script>


<style scoped>


.pagination{
  width:100%;
  display: flex;
  justify-content: space-between;
  margin:40px 0;
}

.pagination button{
  width:60px;
  height:60px;
  border-radius: 50%;
  border:none;
  margin:0 40px;
}



.pagination .pagination_unlocked{
  background-color: #e33441;
  color:#FFF;
}

.pagination .pagination_unlocked:hover{
  background-color: #fa4753;
  cursor: pointer;
}

.pagination .pagination_locked{
  background-color: #888888;
  color: #000000;
}

.pagination .pagination_locked:hover{
  background-color: #8f8f8f;
  cursor: not-allowed;
}



</style>
