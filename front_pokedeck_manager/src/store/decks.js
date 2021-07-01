import axios from "axios";
import router from "../router";

const decks = {
    namespaced: true,

    state(){
        return {
            deckName: '',
            opened:false,
            baseUrl:'http://api-partiel.test',
            selectedEmoji:'',
            decks:[],
            editingDeck:false,
            modes:{
                editingMode:false,
                addingMode:false
            },
            selectedCards: [],
            totalCards:0,
            cardsToDisplay: {},

        }
    },

    getters:{
        getDeckName(state){
            return state.deckName
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
        },
        getModes(state){
            return state.modes
        },
        getSelectedCards(state){
            return state.selectedCards
        },
        // Sert à get toutes les cartes chargé sur la page
        getCardsToDisplay(state){
            return state.cardsToDisplay
        },

    },
    mutations:{
        UPDATE_DECK_NAME(state, payload){
            state.deckName = payload
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
        },
        UPDATE_MODES_STATE(state, payload){
            state.modes = payload
        },
        UPDATE_SELECTED_CARDS(state, payload){
            state.selectedCards = payload
        },

    },

    actions:{
        changeDeckName(context, payload){
            context.commit('UPDATE_DECK_NAME', payload);
            if(context.getters.getSelectedEmoji !== ""){
                context.dispatch('addDeck')
            }
        },

        selectEmoji(context, payload){
            // On s'assure d'avoir un code structuré comme on le souhaite, et d'en avoir qu'un seul
            if(payload.length > 5){
                payload = payload.match(/(1F[A-Z 0-9]{3})/)[0]
            }
            context.commit('UPDATE_LIST_EMOJI_STATE', false);
            context.commit('UPDATE_SELECTED_EMOJI', payload);

            if(context.getters.getDeckName !== ""){
                context.dispatch('addDeck')
            }
        },
        toggleListEmoji(context){
            context.commit('UPDATE_LIST_EMOJI_STATE', true);
        },

        async addDeck(context){
            if(context.getters.getSelectedEmoji !== "" && context.getters.getDeckName !== ""){
                const data = {
                    'deck_name':context.getters.getDeckName,
                    'deck_emoji':context.getters.getSelectedEmoji
                };

                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

              const response =   await axios.post(context.state.baseUrl + '/pokemanager/deck', data,header)
                console.log(response)

             if(response.status === 200){
                 await router.replace('/add/' + response.data.id)
                 context.commit('UPDATE_EDIT_DECK_STATE', true);
                 context.dispatch('switchToAddingMode')
             }
            } else {
              // On lance une erreur
            }
        },

        async addToDeck(context, payload){
            if(payload.addPage) { // Si true on est sur la page de création / modification

                // On update à chaque clique sur une carte pour créer un total
                if(context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId)).length > 0){
                    let cardClicked = context.getters.getSelectedCards.filter(({ cardId }) => cardId.includes(payload.cardId))[0]
                    let card = context.state.cardsToDisplay.filter(({ id }) => id.includes(payload.cardId))[0]
                    context.commit('UPDATE_SELECTED_CARDS', context.state.selectedCards)

                    if(card.supertype !== "Energy"){
                        if(cardClicked.quantity < 3) {
                            context.commit('UPDATE_TOTAL_CARDS', context.state.totalCards + 1)
                            card.cardLocked = false
                            card.cardSelected = true

                            if (!card.cardLocked) {
                                cardClicked.quantity++
                                const header = {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                                }

                                console.log(payload.cardId)

                                const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity: cardClicked.quantity + 1, deck_id:router.currentRoute._value.params.id}

                                await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)
                            }
                        } else {
                            cardClicked.quantity = 4

                            const header = {
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            }

                            const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity: cardClicked.quantity + 1, deck_id:router.currentRoute._value.params.id}

                            await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)

                            card.cardLocked = true
                            card.cardSelected = false

                            context.commit('UPDATE_CARDS_TO_DISPLAY', context.state.cardsToDisplay)

                        }
                    } else {
                        cardClicked.quantity++

                        const header = {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                        }

                        const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity: cardClicked.quantity + 1, deck_id:router.currentRoute._value.params.id}

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

                    const data = {id:payload.cardId, card_name:payload.cardName, card_picture:payload.cardPicture, card_quantity: 1, deck_id:router.currentRoute._value.params.id}

                    await axios.post(context.state.baseUrl + '/pokemanager/card', data,header)

                }
            }
        },





        async getAllDecks(context){
            const decks = await axios.get(context.state.baseUrl + '/pokemanager/deck')
            context.commit('UPDATE_DECKS', decks.data);
            console.log(context.getters.getDecks.data.length)
        },
        switchToEdit(context){
            if(router.currentRoute._value.params.id === undefined){
                context.commit('UPDATE_EDIT_DECK_STATE', false);
            } else {
                context.commit('UPDATE_EDIT_DECK_STATE', true);
            }
        },
        switchToEditMode(context){
            context.commit('UPDATE_MODES_STATE', {
                editingMode:true,
                addingMode:false
            })
        },
        switchToAddingMode(context){
            context.commit('UPDATE_MODES_STATE', {
                editingMode:false,
                addingMode:true
            })
        },
        resetModes(context){
            context.commit('UPDATE_MODES_STATE', {
                editingMode:false,
                addingMode:false
            })
        }
    },

}

export default decks;