const Bank = {
    namespaced: true,
    state: () => ({
        items: {}
    }),
    mutations: {
        add: (state, payload) => {
            if(!state.items[payload.item]) {
                state.items[payload.item] = {
                    amount: payload.amount
                }
            }
            else state.items[payload.item].amount += payload.amount;

            state.items = {...state.items}; // This is done, so vuex picks up the change, and the view gets updated.
        },
        remove: (state, payload) => {
            if(state.items[payload.item]) {
                if(state.items[payload.item].amount > payload.amount) {
                    state.items[payload.item].amount -= payload.amount;
                }
                else if(state.items[payload.item].amount === payload.amount) {
                    delete state.items[payload.item];
                }

                state.items = {...state.items}; // This is done, so vuex picks up the change, and the view gets updated.
            }
        },
        reset: (state) => {
            state.items = {};
        }
    },
    getters: {
        items: state => {
            return state.items;
        },
        has: (state, item) => {
            return state.items[item] && state.items[item].amount > 0
        }
    }
}

export default Bank;