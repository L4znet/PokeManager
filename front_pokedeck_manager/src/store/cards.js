import axios from 'axios'
//import router from '../router'

const cards = {
    namespaced: true,

    state(){
        return {
            cards: {},
            results:{},
            isSearching:false,
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
            totalCardsToLoad:250,
            cardsToLoad:16,
            cardsLoadedOnce:false,
            pendingRequest:false
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
        getCardsLoadedOnceState(state){
            return state.cardsLoadedOnce
        },
        getPendingRequestState(state){
            return state.pendingRequest
        },
        getCardsLoadedCount(state){
            return state.cardsToLoad
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
        UPDATE_CARDS_LOADED_ONCE_STATE(state, payload){
            state.cardsLoadedOnce = payload
        },
        UPDATE_CARDS_TO_LOAD(state, payload){
            state.cardsToLoad = payload
        },
        UPDATE_PENDING_REQUEST_STATE(state, payload){
            state.pendingRequest = payload
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


            // Au premier chargmenet de la page, on charge 16 cartes
            if(!context.state.cardsLoadedOnce){

                // On empêche l'utilisateur de cliquer sur le bouton "En charger plus"
                context.commit('UPDATE_PENDING_REQUEST_STATE', true);

                const firebaseResponse = await axios.get(url, {
                    params:{
                        'pageSize':16
                    },
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                // On envoi les cartes dans l'HTML
                context.commit('UPDATE_CARDS', firebaseResponse.data.data);

                // On réactive le bouton après le chargement
                context.commit('UPDATE_PENDING_REQUEST_STATE', false);

                // A partir de maintenant on permet à l'utilisateur de charger d'autres cartes via le bouton en charger plus
                context.commit('UPDATE_CARDS_LOADED_ONCE_STATE', true);

            } else {
                // L'utilisateur a cliqué sur le bouton pour charger plus de cartes

                // On désactive le clique sur le bouton pour l'utilisateur
                context.commit('UPDATE_PENDING_REQUEST_STATE', true);

                // On ajoute 16 au nombre de cartes chargé actuellement
                context.commit('UPDATE_CARDS_TO_LOAD', context.getters.getCardsLoadedCount + 16);

                    const firebaseResponse = await axios.get(url, {
                        params:{
                            'pageSize':context.getters.getCardsLoadedCount
                        },
                        headers: {
                            'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                        }
                    })

                    // On envoi les cartes dans l'HTML
                    context.commit('UPDATE_CARDS', firebaseResponse.data.data);

                context.commit('UPDATE_PENDING_REQUEST_STATE', false);
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
    },

}

export default cards;