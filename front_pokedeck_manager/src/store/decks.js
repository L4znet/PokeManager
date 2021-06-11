import axios from "axios";

const decks = {
    namespaced: true,

    state(){
        return {
            deckName: '',
            opened:false,
            baseUrl:'http://api-partiel.test',
            selectedEmoji:''
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
        }
    },

    actions:{
        addToDeck(context, payload){
            if(payload){ // Si true on est sur la page de création / modification

                const card = {
                    cardName:payload.name,
                    cardQuantity:1
                }

                console.log(context.getters.getDeck)

                context.commit('UPDATE_DECK', context.getters.getDeck + card);
            } else { // On est sur la home donc on ne doit pas gérer le clique

            }
        },
        changeDeckName(context, payload){
            context.commit('UPDATE_DECK_NAME', payload);
            context.dispatch('addDeck')
        },

        selectEmoji(context, payload){
            // String.fromCodePoint(0x1F611)

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
        }
    },

}

export default decks;