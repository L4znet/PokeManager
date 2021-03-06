import axios from 'axios'
import router from "../router";

const cards = {
    namespaced: true,

    state(){
        return {
            cardsToDisplay: {},
            allCards: {},
            results: {},
            isSearching: false,
            baseUrl: 'http://api-partiel.test',
            rarities: [
                "Tous",
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
            types: [
                "Tous",
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
            sets:[
                "Tous",
                "Base",
                "Jungle",
                "Wizards Black Star Promos",
                "Fossil",
                "Team Rocket",
                "Gym Heroes",
                "Gym Challenge",
                "Neo Genesis",
                "Neo Discovery",
                "Southern Islands",
                "Neo Revelation",
                "Neo Destiny",
                "Legendary Collection",
                "Expedition Base Set",
                "Aquapolis",
                "Skyridge",
                "Sandstorm",
                "Dragon",
                "Nintendo Black Star Promos",
                "Team Magma vs Team Aqua",
                "Hidden Legends",
                "Team Rocket Returns",
                "Deoxys",
                "Emerald",
                "Unseen Forces",
                "Delta Species",
                "Legend Maker",
                "Holon Phantoms",
                "Crystal Guardians",
                "Dragon Frontiers",
                "Power Keepers",
                "DP Black Star Promos",
                "Mysterious Treasures",
                "Secret Wonders",
                "Great Encounters",
                "Majestic Dawn",
                "Legends Awakened",
                "Stormfront",
                "Platinum",
                "Rising Rivals",
                "Supreme Victors",
                "Arceus",
                "HGSS Black Star Promos",
                "Call of Legends",
                "BW Black Star Promos",
                "Emerging Powers",
                "Noble Victories",
                "Next Destinies",
                "Dark Explorers",
                "Dragons Exalted",
                "Dragon Vault",
                "Boundaries Crossed",
                "Plasma Storm",
                "Plasma Freeze",
                "Plasma Blast",
                "XY Black Star Promos",
                "Legendary Treasures",
                "Kalos Starter Set",
                "XY",
                "Flashfire",
                "Furious Fists",
                "Phantom Forces",
                "Primal Clash",
                "Double Crisis",
                "Roaring Skies",
                "Ancient Origins",
                "BREAKthrough",
                "BREAKpoint",
                "Generations",
                "Fates Collide",
                "Steam Siege",
                "Evolutions",
                "SM Black Star Promos",
                "Guardians Rising",
                "Burning Shadows",
                "Shining Legends",
                "Crimson Invasion",
                "Ultra Prism",
                "Forbidden Light",
                "Celestial Storm",
                "Dragon Majesty",
                "Lost Thunder",
                "Team Up",
                "Detective Pikachu",
                "Unbroken Bonds",
                "Unified Minds",
                "Hidden Fates",
                "Shiny Vault",
                "Cosmic Eclipse",
                "SWSH Black Star Promos",
                "Rebel Clash",
                "Darkness Ablaze",
                "Vivid Voltage",
                "Shining Fates",
                "Shiny Vault",
                "Battle Styles",
                "Chilling Reign"],
            selectedCards: [],
            paginationButtonLocked: {'left': {locked: true}, 'right': {locked: false}},
            pageNumber: 0,
            totalCards: 0,
            deckCards: {},
            quantity: 0,
            loadingState: false,
            deckCompletedList: [],
            currentDeckInfo:{}
        }
    },

    getters:{
        // Sert ?? get toutes les cartes charg?? sur la page
        getCardsToDisplay(state){
            return state.cardsToDisplay
        },
        // Sert ?? get toutes les cartes (pas divis??)
        getAllCards(state){
            return state.allCards
        },


        getSearchResults(state){
            return state.results
        },
        // Permet d'afficher la page des r??sultats quand on effectue une recherche ou quand on veut filtrer
        getSearchState(state){
            return state.isSearching
        },


        getRarities(state){
            return state.rarities
        },
        getTypes(state){
            return state.types
        },
        getAllSet(state){
            return state.sets
        },

        // Contient les cartes sur lesquels on a cliqu??
        getSelectedCards(state){
            return state.selectedCards
        },

        // Sert ?? get l'??tat des boutons de pagination
        getPaginationButtonLockedState(state){
            return state.paginationButtonLocked;
        },

        // Contient le num??ro de page actuel, sert ?? la pagination
        getPageNumber(state){
            return state.pageNumber
        },

        // Contient le nombre total de cartes dans un deck (quantit?? inclus)
        getTotalCards(state){
            return state.totalCards
        },

        // Contient les cartes d'un deck
        getDeckCards(state){
            return state.deckCards
        },

        // Permet de limiter le nombre de clique en utilisant une sorte de loader
        getLoadingState(state){
            return state.loadingState
        },

        // Contient les decks que l'on a marqu?? comme "Complet"
        getDeckCompletedList(state){
            return state.deckCompletedList
        },

        // Contient les informations relative au deck ouvert sur la page
        getCurrentDeckInfo(state){
            return state.currentDeckInfo
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
        UPDATE_LOADING_STATE(state, payload){
            state.loadingState = payload
        },
        UPDATE_DECK_COMPLETED_LIST(state, payload){
            state.deckCompletedList = payload
        },
        UPDATE_CURRENT_DECK_INFO(state, payload){
            state.currentDeckInfo = payload
        }
    },

    actions:{

        /**
         * Action qui g??re l'affichage et le chargement des cartes
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
                // On charge les cartes "??nergies"
                const energyCards = await axios.get(url + 'cards?q=supertype:energy', {
                    headers: {
                        'X-Api-Key': 'a866fc6e-69bd-4d6f-8821-cbb658fdca00',
                    }
                })

                // On les rassemble toutes dans un seul tableau
                let allCards = cards.data.data.concat(energyCards.data.data)

                // Et on mets ?? jour le state correspondant
                context.commit('UPDATE_ALL_CARDS_STATE',allCards);

                // On passe ensuite le relais ?? notre m??thode de division / affichage des donn??es
                context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:0})

         },

        /**
         * Action qui sert ?? incr??menter le num??ro de page
         *
         * @param context
         */
        incrementPageNumber(context){
            // On v??rifie que le bouton d'incr??mentation (droite) n'est pas verrouill??, si c'est le cas on ne fait rien
         if(!context.getters.getPaginationButtonLockedState.right.locked){

             // On incr??mente le num??ro de page ?? chaque fois que l'action est lanc??e
             context.commit('UPDATE_PAGE_NUMBER', context.state.pageNumber + 1)

             // Si le num??ro de page est ??gale au nomre de page total, on affiche la derni??re page et on verouille
             if(context.getters.getPageNumber === 21){
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:21})
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:true}});
             } else {
                 // Sinon on incr??mente
                 context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
                 context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:context.state.pageNumber})
             }
         }
        },

        /**
         * Action qui sert ?? d??c??menter le num??ro de page
         *
         * @param context
         */
        decrementPageNumber(context){

            // On v??rifie que le bouton de d??cr??mentation (gauche) n'est pas verrouill??, si c'est le cas on ne fait rien
            if(!context.getters.getPaginationButtonLockedState.left.locked){

                // Si on commenc?? ?? d??cr??menter et que le bouton de droite (incr??mentation) est verouill??, on le d??verouille
                if(context.getters.getPaginationButtonLockedState.right.locked){
                    context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:false}, 'right':{locked:false}});
                }

                // Tant que le num??ro de page courant est sup??rieur ?? 1, on d??cremente, quand il est ??gale ?? 1 on affiche la premi??re page et on verouille.
                if(context.getters.getPageNumber > 1){
                    context.commit('UPDATE_PAGE_NUMBER', context.getters.getPageNumber - 1);

                    context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:context.getters.getPageNumber})

                } else {
                    context.dispatch('displayCardsChunk', {arraySize:23, chunkIndex:0})
                    context.commit('UPDATE_PAGINATION_BUTTON_LOCKED', {'left':{locked:true}, 'right':{locked:false}});

                }
            }
        },

        /**
         * Action qui g??re la recherche
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

                // On active le mode recherche et on envoi les r??sultats dans le front
                context.commit('UPDATE_SEARCH_STATE', true);
                context.commit('UPDATE_RESULTS', results);

                // Si le searchTerm est vide, on arr??te le mode "Recherche"
                if(payload.searchTerm === ""){
                    context.commit('UPDATE_SEARCH_STATE', false);
                }

            } else {
                // On filtre avec le searchTerm
                let results = payload.cards.filter(item => {
                    return item.name.includes(payload.searchTerm);
                }, payload.searchTerm);

                // On active le mode recherche et on envoi les r??sultats dans le front
                context.commit('UPDATE_SEARCH_STATE', true);
                context.commit('UPDATE_RESULTS', results);

                // Si le searchTerm est vide, on arr??te le mode "Recherche"
                if(payload.searchTerm === ""){
                    context.commit('UPDATE_SEARCH_STATE', false);
                }
            }


        },

        /**
         * Permet de reset la barre de recherche apr??s qu'on ai effectu?? une recherche
         *
         * @param context
         */
        resetSearch(context){
            context.commit('UPDATE_SEARCH_STATE', false)
            context.commit('UPDATE_RESULTS', '');
        },


        /**
         * Action qui g??re les filtres
         *
         * @param context
         * @param payload
         */
        filterBy(context, payload){
            let results = []
            switch (payload.filterType){
                case "rarity":
                    for (let i = 0; i < context.getters.getAllCards.length; i++) {
                        if(context.getters.getAllCards[i].rarity === payload.filterValue){
                            results.push(context.getters.getAllCards[i])
                            context.commit('UPDATE_RESULTS', results);
                            context.commit('UPDATE_SEARCH_STATE', true);
                        } else if( payload.filterValue === "Tous"){
                            context.commit('UPDATE_SEARCH_STATE', false);
                        }
                    }

                    break;
                case "types":
                    for (let i = 0; i < context.getters.getAllCards.length; i++) {
                        if(context.getters.getAllCards[i].supertype === "Pok??mon"){
                            if(context.getters.getAllCards[i].types[0] === payload.filterValue){
                                results.push(context.getters.getAllCards[i])
                                context.commit('UPDATE_RESULTS', results);
                                context.commit('UPDATE_SEARCH_STATE', true);
                            }  else if( payload.filterValue === "Tous"){
                                context.commit('UPDATE_SEARCH_STATE', false);
                            }
                        }
                    }
                    break;
                case "set":
                    for (let i = 0; i < context.getters.getAllCards.length; i++) {
                        if(context.getters.getAllCards[i].set.name === payload.filterValue){
                            results.push(context.getters.getAllCards[i])
                            context.commit('UPDATE_RESULTS', results);
                        }  else if( payload.filterValue === "Tous"){
                            context.commit('UPDATE_SEARCH_STATE', false);
                        }
                    }
                    break;

            }

            if(payload.filterValue === ""){
                context.commit('UPDATE_SEARCH_STATE', false);
            }
        },


        /**
         * Action qui g??re les cartes au deck
         *
         * @param context
         * @param payload
         * @returns {Promise<void>}
         */
        async addToDeck(context, payload){

            // On r??cup??re l'Id du deck courant
            let deckId = router.currentRoute._value.params.id

            if(payload.addPage) { // Si true on est sur la page de cr??ation / modification

                // On regarde si la carte sur laquelle on clique est d??j?? pr??sente dans le deck, si c'est le cas on modifie sa quantit??, si ce n'est pas le cas on l'ajoute au deck
                if(context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId)).length !== 0){
                    let cardClicked = context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId))[0]
                    let card = context.state.cardsToDisplay.filter(({ id }) => id.includes(payload.cardId))[0]
                    context.commit('UPDATE_SELECTED_CARDS', context.state.selectedCards)

                    // Si la carte n'est pas une carte ??nergie...
                    if(card.supertype !== "Energy"){
                        // et si la quantit?? de cette carte est inf??rieur ?? 4
                        if(cardClicked.quantity < 4) {
                            // On change son statut
                            card.cardLocked = false
                            card.cardSelected = true

                            // Si la carte sur laquelle on clique n'est pas bloqu??
                            if (!card.cardLocked) {
                                // On modifie sa quantit??, jusqu'?? ce qu'on ne puisse plus
                                cardClicked.quantity++

                                // et on l'envoi en base de donn??es
                                const header = {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                }

                                const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity:cardClicked.quantity, deck_id:deckId}

                                await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)
                            }
                        }

                        // Si la quantit?? de la carte atteint 4, on bloque la carte "et on update
                        if(cardClicked.quantity === 4){
                            card.cardLocked = true
                            card.cardSelected = false
                            context.commit('UPDATE_CARDS_TO_DISPLAY', context.state.cardsToDisplay)
                        }
                    } else {
                        // Si la carte est une carte ??nergie, on incr??mente la quantit??, jusqu'?? ce qu'on ait atteint la limite du nombre de cartes par deck

                        cardClicked.quantity++

                        const header = {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }

                        const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity:cardClicked.quantity, deck_id:deckId}

                        await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)

                    }
                } else { // Si la carte n'est pas d??j?? pr??sente dans le deck, on l'ajoute

                    let card = context.state.cardsToDisplay.filter(({ id }) => id.includes(payload.cardId))[0]

                    card.cardSelected = true

                    context.commit('UPDATE_CARDS_TO_DISPLAY', context.state.cardsToDisplay)

                    context.state.selectedCards.push({cardId:payload.cardId, cardName:payload.cardName, quantity: 1})
                    context.commit('UPDATE_SELECTED_CARDS', context.state.selectedCards)

                    const header = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }

                    const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture,card_quantity:1, deck_id:deckId}


                    await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)
                }
            }
            // Et on demande au code de charger les cartes du deck, pour mettre ?? jour ?? chaque ajout / modification
            context.dispatch('loadCardsToDeck')
        },


        /**
         * Action qui v??rifie le nombre de cartes totale pr??sente dans un deck, elle se place avant l'action "AddToDeck" en tant que v??rificateur
         *
         * @param context
         * @param payload
         * @returns {Promise<void>}
         */
       async checkIfDeckCompleted(context, payload){

           // On r??cup??re l'id du deck courant
           let deckId = router.currentRoute._value.params.id


            // On fais la somme des cartes en utilisant leurs quantit??s
           let numberTotalCards = context.getters.getDeckCards.reduce(function (iteratorValue, currentValue) {
               return iteratorValue + currentValue.card_quantity;
           }, 0);

            // Si le deck courant n'est pas "complet"
           if(context.getters.getCurrentDeckInfo.is_complete === 0){

               // Si le nombre total de cartes est ??gal ?? 59
               if(numberTotalCards === 59){
                   // On l'update ?? 60 (d??callage entre le clique et le nombre)
                   context.commit('UPDATE_TOTAL_CARDS', 60)

                   // On l'ajoute ?? la liste des decks complets
                   context.getters.getDeckCompletedList[deckId] = {id:deckId, completed:true}
                   context.commit('UPDATE_DECK_COMPLETED_LIST', context.getters.getDeckCompletedList)
                   const header = {
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                   }
                   // On passe son nombre total de cartes ?? z??ro car on lui a asign?? son ??tat en base de donn??es, il n'est donc plus n??cessaire de l'avoir ici
                   context.commit('UPDATE_TOTAL_CARDS', 0)
                   await axios.patch(context.state.baseUrl + '/pokemanager/deck/'+ deckId +'/completed', {is_complete:true}, header)


                   // On ajoute la carte au deck,
                  await  context.dispatch('addToDeck', payload)
               } else {
                   // Tant que la quantit?? n'est pas ??gal ?? 59 on ajoute au deck
                   await context.dispatch('addToDeck', payload)
               }
           }


        },

        /**
         * Action qui va diviser toutes les cartes charg?? en petit groupe et va les envoyer vers le front
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

            let currentDeck = await axios.get(context.state.baseUrl + '/pokemanager/deck/' + router.currentRoute._value.params.id, header)

            context.commit('UPDATE_CURRENT_DECK_INFO', currentDeck.data);
            context.commit('UPDATE_DECK_CARDS', currentDeck.data.cards);

        },

        async deleteCardFromDeck(context, payload){

            let deckId = router.currentRoute._value.params.id

            context.getters.getDeckCompletedList[deckId] = {id:deckId, completed:false}
            context.commit('UPDATE_DECK_COMPLETED_LIST', context.getters.getDeckCompletedList)

            if(context.getters.getCurrentDeckInfo.is_complete === 1){
                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

                await axios.patch(context.state.baseUrl + '/pokemanager/deck/'+ deckId +'/completed', {is_complete:false}, header)
            }


            // On d??fini un ??tat de chargement pour brider et emp??cher le spam, tant que le loading state n'est pas repass?? ?? false on emp??che le clique
            if(!context.getters.getLoadingState){

                // Au clique on active le changement de state
                context.commit('UPDATE_LOADING_STATE', true)

                let card = context.getters.getDeckCards.filter(({ id }) => id.includes(payload))[0]
                card.card_quantity--

                context.commit('UPDATE_DECK_CARDS',context.getters.getDeckCards)

                // En fonction de la quantit??
                if(card.card_quantity > 0){
                    // On update
                    const header = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    }

                    let response = await axios.patch(context.state.baseUrl + '/pokemanager/card/'+ payload +'/decrement', header)

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

                        // Pour ??viter de bloquer l'utilisateur si l'on rencontre une erreur, on d??sactive le loading dans tous les cas
                        context.commit('UPDATE_LOADING_STATE', false)
                        context.dispatch('loadCardsToDeck')
                    }
                }
            }
        },



    },

}

export default cards;