<template>
  <div id="nav">
    <router-link to="/"><i class="fas fa-home"></i></router-link>
    <router-link to="/mydecks"><i class="fas fa-window-restore"></i></router-link>
    <router-link to="/add"><i class="far fa-plus-square"></i></router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>

body{
  background-color: #f1f1f1;
  font-family: 'Roboto', sans-serif;
}

*{
  margin:0;
  padding:0;

}

#nav {
  width:100%;
  height:70px;
  background-color: #e33441;
  display: flex;
  justify-content: center;
}

#nav a {
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #813232;
  width:100px;
  font-size:30px;
  text-decoration: none;
  background-color: #e33441;
}

#nav a:hover{
  background-color: #fa4753;
}

#nav a.router-link-exact-active {
  color:#FFF;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
