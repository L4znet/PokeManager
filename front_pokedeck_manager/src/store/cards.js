import axios from 'axios'
import router from '@/router'

const cards = {
    namespaced: true,

    state(){
        return {
            cards: {},
            results: {},
            isSearching: false,
            baseUrl: 'http://api-partiel.test',
            rarities: [
                "Amazing Rare",
                "Common",
                "LEGEND",
                "Promo",
                "Rare",
                "Rare ACE",
                "Rare BREAK",
                "Rare Holo",
                "Rare Holo EX",
                "Rare Holo GX",
                "Rare Holo LV.X",
                "Rare Holo Star",
                "Rare Holo V",
                "Rare Holo VMAX",
                "Rare Prime",
                "Rare Prism Star",
                "Rare Rainbow",
                "Rare Secret",
                "Rare Shining",
                "Rare Shiny",
                "Rare Shiny GX",
                "Rare Ultra",
                "Uncommon"
            ],
            cardCountClickArray: [],
            selectedCards: [],
            paginationButtonLocked: {'left':{locked:true}, 'right':{locked:false}},
            pageNumber:1
        }
    },

    getters:{
        // Contient toutes les cartes chargé sur la page
        getCards(state){
            return state.cards
        },
        getSearchResults(state){
            return state.results
        },
        getSearchState(state){
            return state.isSearching
        },
        getRarities(state){
            return state.rarities
        },
        getCardCountClickArray(state){
            return state.cardCountClickArray
        },
        getSelectedCards(state){
            return state.selectedCards
        },
        getPaginationButtonLockedState(state){
            return state.paginationButtonLocked;
        },
        getPageNumber(state){
            return state.pageNumber
        }
    },
    mutations:{
        UPDATE_CARDS(state, payload){
            state.cards = payload
        },
        UPDATE_RESULTS(state, payload){
            state.results = payload
        },
        UPDATE_SEARCH_STATE(state, payload){
            state.isSearching = payload
        },
        UPDATE_CARD_COUNT_CLICK_ARRAY(state, payload){
            state.cardCountClickArray = payload
        },
        UPDATE_SELECTED_CARDS(state, payload){
            state.selectedCards = payload
        },
        UPDATE_PAGINATION_BUTTON_LOCKED(state, payload){
            state.paginationButtonLocked = payload
        },
        UPDATE_PAGE_NUMBER(state, payload){
            state.pageNumber = payload
        }
    },

    actions:{

        /**
         * Action qui gère l'affichage et le chargement des cartes
         *
         * @param context
         * @returns {Promise<void>}
         */
        async loadCards(context){
            const url = "https://api.pokemontcg.io/v2/cards";
                const firebaseResponse = await axios.get(url, {
                    params:{
                        'pageSize':64,
                        'page':context.state.pageNumber
                    },
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                // On envoi les cartes dans l'HTML
                context.commit('UPDATE_CARDS', firebaseResponse.data.data);
         },

        incrementPageNumber(context, payload){
            console.log('sdffsdfsd',payload)

          if(payload < 53){
              context.commit('UPDATE_PAGE_NUMBER',payload);
              context.dispatch('loadCards')
              context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});


          } else if(payload === 53){
              context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:true}});
          }
        },

        decrementPageNumber(context,payload){

            if(context.getters.getPaginationButtonLockedState.right.locked){
                context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
            }
            if(payload === 1){
                context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:true}, 'right':{locked:false}});
            } else {
                context.commit('UPDATE_PAGE_NUMBER',payload);
                context.dispatch('loadCards')
            }
        },

        /**
         * Action qui gère la recherche
         *
         * @param context
         * @param payload
         */
        searchValue(context, payload){
            let results = payload.cards.filter(item => {
                return item.name.includes(payload.searchTerm);
            }, payload.searchTerm);
            context.commit('UPDATE_SEARCH_STATE', true);
            context.commit('UPDATE_RESULTS', results);

            if(payload.searchTerm === ""){
                context.commit('UPDATE_SEARCH_STATE', false);
            }
        },

        /**
         * Action qui gère les filtres
         *
         * @param context
         * @param payload
         */
        filterBy(context, payload){
            let results = payload.cards.filter(item => {
                return item.rarity.includes(payload.filterValue);
            }, payload.filterValue);
            context.commit('UPDATE_SEARCH_STATE', true);
            context.commit('UPDATE_RESULTS', results);

            if(payload.filterValue === ""){
                context.commit('UPDATE_SEARCH_STATE', false);
            }
        },



        async addToDeck(context, payload){
            if(payload.addPage) { // Si true on est sur la page de création / modification
                if(context.getters.getCardCountClickArray.length === 0){
                    let clickCount = context.getters.getCardCountClickArray;

                    clickCount.push({
                        'id': payload.cardId,
                        'quantity':1
                    })
                    context.commit('UPDATE_CARD_COUNT_CLICK_ARRAY', clickCount);
                } else {
                    let clickCount = context.getters.getCardCountClickArray;
                    if(clickCount.find(card => card.id === payload.cardId)){
                        let cardToChange = clickCount.find(card => card.id === payload.cardId);
                        if(cardToChange.quantity <= 3){
                            cardToChange.quantity++

                            const header = {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            }

                            await axios.post(context.state.baseUrl + '/pokemanager/card', {
                                id:payload.cardId,
                                deck_id:router.currentRoute._value.params.id,
                                card_name:payload.cardName
                            },header)
                        }
                    }
                }
            }
        },

        async loadSelectedCard(context){

            const selectedCards = await axios.get(context.state.baseUrl + '/pokemanager/deck/' + router.currentRoute._value.params.id)

            console.log(selectedCards.data)

            context.commit('UPDATE_SELECTED_CARDS', selectedCards.data);

        }




    },

}

export default cards;