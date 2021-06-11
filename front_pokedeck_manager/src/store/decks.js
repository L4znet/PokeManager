const decks = {
    namespaced: true,

    state(){
        return {

        }
    },

    getters:{

    },
    mutations:{


    },

    actions:{
        addToDeck(context, payload){
         console.log(payload.test)
        },
    },

}

export default decks;