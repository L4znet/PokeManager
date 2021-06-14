import axios from "axios";
import router from '@/router'

const decks = {
    namespaced: true,

    state(){
        return {
            deckName: '',
            opened:false,
            baseUrl:'http://api-partiel.test',
            selectedEmoji:'',
            cardQuantity:0,
            decks:[],
            editingDeck:false
        }
    },

    getters:{
        getDeckName(state){
            return state.deckName
        },
        getQuantityCard(state){
            return state.cardQuantity
        },
        getDeck(state){
            return state.deck
        },
        getListEmojiState(state){
            return state.opened
        },
        getSelectedEmoji(state){
            return state.selectedEmoji
        },
        getDecks(state){
            return state.decks
        },
        getEditDeckState(state){
            return state.editingDeck
        }
    },
    mutations:{
        UPDATE_DECK_NAME(state, payload){
            state.deckName = payload
        },
        UPDATE_CARD_QUANTITY(state, payload){
            state.cardQuantity = payload
        },
        UPDATE_DECK(state, payload){
            state.deck = payload
        },
        UPDATE_LIST_EMOJI_STATE(state, payload){
            state.opened = payload
        },
        UPDATE_SELECTED_EMOJI(state, payload){
            state.selectedEmoji = payload
        },
        UPDATE_DECKS(state, payload){
            state.decks = payload
        },
        UPDATE_EDIT_DECK_STATE(state, payload){
            state.editingDeck = payload
        }
    },

    actions:{
        addToDeck(context, payload){
            console.log(payload)

            if(payload.addPage){ // Si true on est sur la page de création / modification

                // On ajoute pas plus de 4 cartes identiques.
                if(context.state.cardQuantity < 4){
                    context.commit('UPDATE_CARD_QUANTITY', context.state.cardQuantity += 1);
                }

                const card = {
                    cardName:payload.cardName,
                    cardQuantity:context.state.cardQuantity
                }

                console.log(card)
            }
        },
        changeDeckName(context, payload){
            context.commit('UPDATE_DECK_NAME', payload);
            context.dispatch('addDeck')
        },

        selectEmoji(context, payload){
            // On s'assure d'avoir un code structuré comme on le souhaite, et d'en avoir qu'un seul
            if(payload.length > 5){
                payload = payload.match(/(1F[A-Z 0-9]{3})/)[0]
            }

            context.commit('UPDATE_LIST_EMOJI_STATE', false);
            context.commit('UPDATE_SELECTED_EMOJI', payload);

        },
        toggleListEmoji(context){
            context.commit('UPDATE_LIST_EMOJI_STATE', true);
        },

        async addDeck(context){
            if(context.getters.getSelectedEmoji != "" && context.getters.getDeckName != ""){
                const data = {
                    'deck_name':context.getters.getDeckName,
                    'deck_emoji':context.getters.getSelectedEmoji
                };

                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

                await axios.post(context.state.baseUrl + '/pokemanager/deck', data,header)
            } else {
              // On lance une erreur
            }
        },
        async getAllDecks(context){
            const decks = await axios.get(context.state.baseUrl + '/pokemanager/deck')
            context.commit('UPDATE_DECKS', decks.data);
        },
        switchToEdit(context){
            if(router.currentRoute._value.params.id === undefined){
                context.commit('UPDATE_EDIT_DECK_STATE', false);
            } else {
                context.commit('UPDATE_EDIT_DECK_STATE', true);
            }
        }
    },

}

export default decks;