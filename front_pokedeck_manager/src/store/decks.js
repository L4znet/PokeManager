const decks = {
    namespaced: true,

    state(){
        return {
            deckName: '',
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
        }
    },

}

export default decks;