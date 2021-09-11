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
        reset: (state) => {
            state.items = {};
        }
    },
    getters: {
        items: state => {
            return state.items;
        }
    }
}

export default Bank;