
const decks = {
    namespaced: true,

    state(){
        return {
            deckName: '',
            opened:false
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
        },

        selectEmoji(context){
            context.commit('UPDATE_LIST_EMOJI_STATE', false);

        },
        toggleListEmoji(context){
            context.commit('UPDATE_LIST_EMOJI_STATE', true);
        }
    },

}

export default decks;