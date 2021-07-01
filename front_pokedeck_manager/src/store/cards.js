import axios from 'axios'
import router from "../router";
//import router from '@/router'

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
            types:[
                "Colorless",
                "Darkness",
                "Dragon",
                "Fairy",
                "Fighting",
                "Fire",
                "Grass",
                "Lightning",
                "Metal",
                "Psychic",
                "Water"
            ],
            selectedCards: [],
            paginationButtonLocked: {'left':{locked:true}, 'right':{locked:false}},
            pageNumber:0,
            totalCards:0,
            deckCards:{},
            quantity:0,
            loadingState:false
        }
    },

    getters:{
        // Sert à get toutes les cartes chargé sur la page
        getCardsToDisplay(state){
            return state.cardsToDisplay
        },
        // Sert à get toutes les cartes (pas divisé)
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
        getTypes(state){
            return state.types
        },
        getCardCountClickArray(state){
            return state.cardCountClickArray
        },
        getSelectedCards(state){
            return state.selectedCards
        },

        // Sert à get l'état des boutons de pagination
        getPaginationButtonLockedState(state){
            return state.paginationButtonLocked;
        },
        getPageNumber(state){
            return state.pageNumber
        },
        getTotalCards(state){
            return state.totalCards
        },
        getDeckCards(state){
            return state.deckCards
        },
        getQuantity(state){
            return state.quantity
        },
        getLoadingState(state){
            return state.loadingState
        }
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
        UPDATE_TOTAL_CARDS(state, payload){
            state.totalCards = payload
        },
        UPDATE_DECK_CARDS(state, payload){
            state.deckCards = payload
        },
        UPDATE_QUANTITY(state, payload){
            state.quantity = payload
        },
        UPDATE_LOADING_STATE(state, payload){
            state.loadingState = payload
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
            const url = "https://api.pokemontcg.io/v2/";

                // On charge les cartes "normale"
                const cards = await axios.get(url + 'cards', {
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })
                // On charge les cartes "énergies"
                const energyCards = await axios.get(url + 'cards?q=supertype:energy', {
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                // On les rassemble toutes dans un seul tableau
                let allCards = cards.data.data.concat(energyCards.data.data)

                // Et on mets à jour le state correspondant
                context.commit('UPDATE_ALL_CARDS_STATE',allCards);

                // On passe ensuite le relais à notre méthode de division / affichage des données
                context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:0})

         },

        /**
         * Action qui sert à incrémenter le numéro de page
         *
         * @param context
         */
        incrementPageNumber(context){
            // On vérifie que le bouton d'incrémentation (droite) n'est pas verrouillé, si c'est le cas on ne fait rien
         if(!context.getters.getPaginationButtonLockedState.right.locked){

             // On incrémente le numéro de page à chaque fois que l'action est lancée
             context.commit('UPDATE_PAGE_NUMBER', context.state.pageNumber + 1)

             // Si le numéro de page est égale au nomre de page total, on affiche la dernière page et on verouille
             if(context.getters.getPageNumber === 21){
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:21})
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:true}});
             } else {
                 // Sinon on incrémente
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:context.state.pageNumber})
             }
         }
        },

        /**
         * Action qui sert à décémenter le numéro de page
         *
         * @param context
         */
        decrementPageNumber(context){

            // On vérifie que le bouton de décrémentation (gauche) n'est pas verrouillé, si c'est le cas on ne fait rien
            if(!context.getters.getPaginationButtonLockedState.left.locked){

                // Si on commencé à décrémenter et que le bouton de droite (incrémentation) est verouillé, on le déverouille
                if(context.getters.getPaginationButtonLockedState.right.locked){
                    context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
                }

                // Tant que le numéro de page courant est supérieur à 1, on décremente, quand il est égale à 1 on affiche la première page et on verouille.
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


            if(payload.isDeckDetail){

                // On filtre avec le searchTerm
                let results = payload.cards.filter(item => {
                    return item.card_name.includes(payload.searchTerm);
                }, payload.searchTerm);

                console.log(results)

                // On active le mode recherche et on envoi les résultats dans le front
                context.commit('UPDATE_SEARCH_STATE', true);
                context.commit('UPDATE_RESULTS', results);

                // Si le searchTerm est vide, on arrête le mode "Recherche"
                if(payload.searchTerm === ""){
                    context.commit('UPDATE_SEARCH_STATE', false);
                }

            } else {
                // On filtre avec le searchTerm
                let results = payload.cards.filter(item => {
                    return item.name.includes(payload.searchTerm);
                }, payload.searchTerm);

                // On active le mode recherche et on envoi les résultats dans le front
                context.commit('UPDATE_SEARCH_STATE', true);
                context.commit('UPDATE_RESULTS', results);

                // Si le searchTerm est vide, on arrête le mode "Recherche"
                if(payload.searchTerm === ""){
                    context.commit('UPDATE_SEARCH_STATE', false);
                }
            }


        },

        /**
         * Action qui gère les filtres
         *
         * @param context
         * @param payload
         */
        filterBy(context, payload){

            let results = []
            let results2 = []

            switch (payload.filterType){
                case "rarity":
                    results = []
                    for (let i = 0; i < context.getters.getAllCards.length; i++) {
                        if(context.getters.getAllCards[i].rarity === payload.filterValue){
                            results.push(context.getters.getAllCards[i])
                        }
                    }
                    break;
                case "types":
                    results = []
                    for (let i = 0; i < context.getters.getAllCards.length; i++) {
                        if(context.getters.getAllCards[i].types[0] === payload.filterValue){
                         results2.push(context.getters.getAllCards[i])
                        }
                    }
                    break;
                case "set":

                    break;

            }

            context.commit('UPDATE_SEARCH_STATE', true);
            context.commit('UPDATE_RESULTS', results);

            if(payload.filterValue === ""){
                context.commit('UPDATE_SEARCH_STATE', false);
            }
        },

        async addToDeck(context, payload){

            if(payload.addPage) { // Si true on est sur la page de création / modification

                if(context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId)).length !== 0){
                    let cardClicked = context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId))[0]
                    let card = context.state.cardsToDisplay.filter(({ id }) => id.includes(payload.cardId))[0]
                    context.commit('UPDATE_SELECTED_CARDS', context.state.selectedCards)

                    if(card.supertype !== "Energy"){

                        console.log(context.getters.getSelectedCards)

                        if(cardClicked.quantity < 4) {
                            context.commit('UPDATE_TOTAL_CARDS', context.state.totalCards + 1)
                            card.cardLocked = false
                            card.cardSelected = true

                            if (!card.cardLocked) {
                                cardClicked.quantity++
                                const header = {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                }

                                const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity:cardClicked.quantity, deck_id:router.currentRoute._value.params.id}

                                await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)
                            }
                        }
                    } else {
                        cardClicked.quantity++

                        const header = {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }

                        const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity:cardClicked.quantity, deck_id:router.currentRoute._value.params.id}

                        await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)

                    }
                } else {

                    let card = context.state.cardsToDisplay.filter(({ id }) => id.includes(payload.cardId))[0]
                    context.commit('UPDATE_TOTAL_CARDS', context.state.totalCards + 1)

                    card.cardSelected = true

                    context.commit('UPDATE_CARDS_TO_DISPLAY', context.state.cardsToDisplay)

                    context.state.selectedCards.push({cardId:payload.cardId, cardName:payload.cardName, quantity: 1})
                    context.commit('UPDATE_SELECTED_CARDS', context.state.selectedCards)

                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

                const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture,card_quantity:1, deck_id:router.currentRoute._value.params.id}


                await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)
                }
            }

            context.dispatch('loadCardsToDeck')
        },


        /**
         * Action qui va diviser toutes les cartes chargé en petit groupe et va les envoyer vers le front
         *
         * @param context
         * @param payload
         */
        displayCardsChunk(context, payload){
            let smallerArrays = [];
            const arraySize = payload.arraySize;
            let cards = context.getters.getAllCards

            // On divise en petit groupe
            for (var i=0;i<Math.ceil(cards.length/arraySize);i++) {
                smallerArrays.push(cards.slice(i*arraySize,i*arraySize+arraySize));
            }

            context.commit('UPDATE_CARDS_TO_DISPLAY', smallerArrays[payload.chunkIndex]);
            // On envoi les cartes dans l'HTML
        },

        async loadCardsToDeck(context){
            const header = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }

            let cardToDisplay = await axios.get(context.state.baseUrl + '/pokemanager/deck/' + router.currentRoute._value.params.id, header)

            context.commit('UPDATE_DECK_CARDS', cardToDisplay);
        },

        async deleteCardFromDeck(context, payload){

            // On défini un état de chargement pour brider et empêcher le spam, tant que le loading state n'est pas repassé à false on empêche le clique
            if(!context.getters.getLoadingState){

                // Au clique on active le changement de state
                context.commit('UPDATE_LOADING_STATE', true)

                let card = context.getters.getDeckCards.data.filter(({ id }) => id.includes(payload))[0]
                card.card_quantity--

                context.commit('UPDATE_DECK_CARDS',context.getters.getDeckCards)

                // En fonction de la quantité
                if(card.card_quantity > 0){
                    // On update
                    const header = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }

                    let response = await axios.put(context.state.baseUrl + '/pokemanager/card/' + payload, header)

                    if(response.status === 200 || response.status === 500 || response.status === 428){
                        context.commit('UPDATE_LOADING_STATE', false)
                        context.dispatch('loadCardsToDeck')
                    }

                } else {

                    // On delete
                    const header = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }

                    let response = await axios.delete(context.state.baseUrl + '/pokemanager/card/' + payload, header)
                    if(response.status === 200 || response.status === 500 || response.status === 428){

                        // Pour éviter de bloquer l'utilisateur si l'on rencontre une erreur, on désactive le loading dans tous les cas
                        context.commit('UPDATE_LOADING_STATE', false)
                        context.dispatch('loadCardsToDeck')
                    }
                }


            }


        }
    },

}

export default cards;