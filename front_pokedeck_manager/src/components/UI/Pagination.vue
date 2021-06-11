<template>
   <section class="pagination">
     <button><i class="fas fa-chevron-left"></i></button>
     <button><i class="fas fa-chevron-right"></i></button>
   </section>
</template>

<script>


export default {
  name: 'Pagination',
  data(){
    return{
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
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
  background-color: #e33441;
  color:#FFF;
  margin:0 40px;
}

.pagination button:hover{
  background-color: #fa4753;
  cursor: pointer;
}

</style>
