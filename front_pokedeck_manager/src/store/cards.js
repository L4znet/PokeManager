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
                        'pageSize':16
                    },
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                // On envoi les cartes dans l'HTML
                context.commit('UPDATE_CARDS', firebaseResponse.data.data);
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