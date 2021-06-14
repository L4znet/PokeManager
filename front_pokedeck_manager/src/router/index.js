import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyDecks from '../views/MyDecks.vue'
import Add from '../views/Add.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/mydecks',
    name: 'MyDecks',
    component: MyDecks
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/add/:id',
    name: 'AddId',
    component: Add
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
