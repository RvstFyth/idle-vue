module.exports = {

    mapping: {
        log: { name: 'log', level: 1, xp: 40, baseTime: 21},
        oak: { name: 'oak log', level: 15, xp: 60, baseTime: 22},
        willow: { name: 'willow log', level: 30, xp: 90, baseTime: 23},
        maple: { name: 'maple log', level: 45, xp: 135.5, baseTime: 24},
        yew: { name: 'yew log', level: 60, xp: 202.5, baseTime: 25},
    },

    run (store, notifier) {
        store.commit('setCharacterSkillXP', {
            skill: 'firemaking',
            xp: this.mapping[store.state.activeAction.resource].xp
        });
        store.commit('bank/remove', {
            item: store.state.activeAction.resource,
            amount: 1
        })
        notifier.success(`Firemaking: +${this.mapping[store.state.activeAction.resource].xp}XP`);

        if(!store.state.bank.items[store.state.activeAction.resource]) {
            notifier.error(`No more logs to burn..`);
            store.commit('resetActiveAction');
            return false;
        }
    }
}