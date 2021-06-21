import axios from 'axios'
import router from '@/router'

const cards = {
    namespaced: true,

    state(){
        return {
            cardsToDisplay: {},
            allCards:{},
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
            pageNumber:0,
        }
    },

    getters:{
        // Contient toutes les cartes chargé sur la page
        getCardsToDisplay(state){
            return state.cardsToDisplay
        },
        getAllCards(state){
            return state.allCards
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
        },
    },
    mutations:{
        UPDATE_CARDS_TO_DISPLAY(state, payload){
            state.cardsToDisplay = payload
        },
        UPDATE_ALL_CARDS_STATE(state, payload){
            state.allCards = payload
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
        },
    },

    actions:{

        /**
         * Action qui gère l'affichage et le chargement des cartes
         *
         * @param context
         * @returns {Promise<void>}
         */
        async loadCards(context){
            const url = "https://api.pokemontcg.io/v2/";
                const cards = await axios.get(url + 'cards', {
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                const energyCards = await axios.get(url + 'cards?q=supertype:energy', {
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })
                let allCards = cards.data.data.concat(energyCards.data.data)
                context.commit('UPDATE_ALL_CARDS_STATE',allCards);
                context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:0})

         },

        incrementPageNumber(context){
         if(!context.getters.getPaginationButtonLockedState.right.locked){
             context.commit('UPDATE_PAGE_NUMBER', context.state.pageNumber + 1)

             if(context.getters.getPageNumber === 21){
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:21})
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:true}});
             } else {
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:context.state.pageNumber})
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
             }
         }
        },

        decrementPageNumber(context){
            if(!context.getters.getPaginationButtonLockedState.left.locked){
                if(context.getters.getPaginationButtonLockedState.right.locked){
                    context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
                }
                if(context.getters.getPageNumber > 1){
                    context.commit('UPDATE_PAGE_NUMBER', context.getters.getPageNumber - 1);

                    console.log(context.getters.getPageNumber)
                    context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:context.getters.getPageNumber})

                } else {
                    context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:0})
                    context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:true}, 'right':{locked:false}});

                }
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
        },

        displayCardsChunk(context, payload){
            let smallerArrays = [];
            const arraySize = payload.arraySize;
            let cards = context.getters.getAllCards

            for (var i=0;i<Math.ceil(cards.length/arraySize);i++) {
                smallerArrays.push(cards.slice(i*arraySize,i*arraySize+arraySize));
            }

            context.commit('UPDATE_CARDS_TO_DISPLAY', smallerArrays[payload.chunkIndex]);

            // On divise

console.log(smallerArrays)

            // On envoi les cartes dans l'HTML

        }



    },

}

export default cards;