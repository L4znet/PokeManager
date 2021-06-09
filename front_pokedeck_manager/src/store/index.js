import { createStore } from 'vuex'
import cards from "./cards";
import decks from "./decks";

const store = createStore({
  modules: {
    cards,
    decks
  }
})
export default store