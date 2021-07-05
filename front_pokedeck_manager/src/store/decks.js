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
        getModes(state){
            return state.modes
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

    },

    actions:{
        addDeckName(context, payload){
            context.commit('UPDATE_DECK_NAME', payload);
            if(context.getters.getSelectedEmoji !== ""){
                context.dispatch('addDeck')
            }
        },


        /**
         * Action qui se lancer quand on clique sur un emoji
         *
         * @param context
         * @param payload
         */
        selectEmoji(context, payload){
            // On s'assure d'avoir un code structuré comme on le souhaite, et d'en avoir qu'un seul
            if(payload.length > 5){
                payload = payload.match(/(1F[A-Z 0-9]{3})/)[0]
            }
            context.commit('UPDATE_LIST_EMOJI_STATE', false);
            context.commit('UPDATE_SELECTED_EMOJI', payload);

            // Si on est en train de modifier un deck, on lance l'action approprié
            if(context.getters.getModes.editingMode){
                context.dispatch('editDeckEmoji', payload)
            } else {
                if(context.getters.getDeckName !== ""){
                    context.dispatch('addDeck')
                    router.push('/mydecks')
                }
            }

        },

        /**
         * Action qui affiche la liste des emoji
         *
         * @param context
         */
        toggleListEmoji(context){
            context.commit('UPDATE_LIST_EMOJI_STATE', true);
        },

        /**
         * Action qui permet d'ajouter un deck
         *
         * @param context
         * @returns {Promise<void>}
         */
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

              const response = await axios.post(context.state.baseUrl + '/pokemanager/deck', data,header)

             if(response.status === 200){
                 await router.replace('/add/' + response.data.id)
                 context.commit('UPDATE_MODES_STATE', { editingMode:true, addingMode:false});
             }
            } else {
              // On lance une erreur
            }
        },

        /**
         * Action qui permet de modifier le nom d'un deck
         *
         * @param context
         * @param payload
         * @returns {Promise<void>}
         */
        async editDeckName(context, payload){
            if(payload !== ""){
                let id = router.currentRoute._value.params.id
                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

                const response =   await axios.patch(context.state.baseUrl + '/pokemanager/deck/'+ id +'/update/name', {'deck_name':payload},header)

                if(response.status === 200){
                    await router.replace('/add/' + id)
                    context.commit('UPDATE_MODES_STATE', { editingMode:true, addingMode:false});
                }
            } else {
                // On lance une erreur
            }
        },


        /**
         * Action qui permet de modifier l'emoji d'un deck
         *
         * @param context
         * @param payload
         * @returns {Promise<void>}
         */
        async editDeckEmoji(context, payload){
            if(payload !== ""){
                let id = router.currentRoute._value.params.id
                const header = {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }

                const response =   await axios.patch(context.state.baseUrl + '/pokemanager/deck/'+ id +'/update/emoji', {'deck_emoji':payload},header)

                if(response.status === 200){
                    await router.replace('/add/' + id)
                    context.commit('UPDATE_MODES_STATE', { editingMode:true, addingMode:false});
                }
            } else {
                // On lance une erreur
            }
        },


        /**
         * Action qui permet de récupérer tous les decks
         *
         * @param context
         * @returns {Promise<void>}
         */
        async getAllDecks(context){
            const decks = await axios.get(context.state.baseUrl + '/pokemanager/deck')
            context.commit('UPDATE_DECKS', decks.data);
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